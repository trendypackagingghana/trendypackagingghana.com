import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { completeProductionRunSchema } from "@/lib/validations/complete-production-run";
import { calculateActualCosts } from "@/lib/calculations/actual-costs";
import { ZodError } from "zod";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = completeProductionRunSchema.parse(body);

    const supabase = await createClient();

    // Verify authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the existing run
    const { data: run, error: fetchError } = await supabase
      .from("production_runs")
      .select("id, status, pieces_per_hour")
      .eq("id", id)
      .single();

    if (fetchError || !run) {
      return NextResponse.json(
        { error: "Production run not found" },
        { status: 404 }
      );
    }

    // Reject if already completed or locked
    if (run.status === "Completed" || run.status === "Locked") {
      return NextResponse.json(
        { error: `Cannot complete a run with status "${run.status}"` },
        { status: 409 }
      );
    }

    // Compute actual costs server-side
    const costs = calculateActualCosts(
      validated.actual_pieces,
      run.pieces_per_hour,
      validated.actual_raw_kg,
      validated.actual_masterbatch_kg
    );

    // Update the run
    const { data: updated, error: updateError } = await supabase
      .from("production_runs")
      .update({
        status: "Completed",
        actual_pieces: validated.actual_pieces,
        actual_raw_kg: validated.actual_raw_kg,
        actual_masterbatch_kg: validated.actual_masterbatch_kg,
        actual_shift: validated.actual_shift,
        completed_at: validated.completed_at,
        actual_labour_cost: costs.actual_labour_cost,
        actual_material_cost: costs.actual_material_cost,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("Update production run error:", updateError);
      return NextResponse.json(
        { error: "Failed to complete production run" },
        { status: 500 }
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Complete production run error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
