import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createProductionRunSchema } from "@/lib/validations/production-run";
import { calculateExpectedValues } from "@/lib/calculations/production-run";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = createProductionRunSchema.parse(body);

    const supabase = await createClient();

    // Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch finished good to snapshot its values
    const { data: good, error: goodError } = await supabase
      .from("finished_goods")
      .select("pieces_per_hour, weight, masterbatch_percentage")
      .eq("sku", validated.finished_good_sku)
      .single();

    if (goodError || !good) {
      return NextResponse.json(
        { error: "Finished good not found" },
        { status: 404 }
      );
    }

    // Server-authoritative calculation
    const expected = calculateExpectedValues(validated.target_quantity, good);

    const { data: run, error: insertError } = await supabase
      .from("production_runs")
      .insert({
        machine_id: validated.machine_id,
        finished_good_sku: validated.finished_good_sku,
        target_quantity: validated.target_quantity,
        planned_start_time: validated.planned_start_time,
        shift: validated.shift,
        ...expected,
        status: "Active",
        created_by: user.id,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert production run error:", insertError);
      return NextResponse.json(
        { error: "Failed to create production run" },
        { status: 500 }
      );
    }

    return NextResponse.json(run, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Create production run error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
