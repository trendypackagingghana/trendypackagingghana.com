import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("finished_goods")
    .select("sku, category, company, size, color, pieces_per_hour, pieces_per_bag, weight, masterbatch_percentage, machine_type")
    .order("category")
    .order("sku");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
