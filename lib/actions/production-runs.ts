"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createProductionRunSchema } from "@/lib/validations/production-run";
import { completeProductionRunSchema } from "@/lib/validations/complete-production-run";
import { calculateExpectedValues } from "@/lib/calculations/production-run";
import { calculateActualCosts } from "@/lib/calculations/actual-costs";

export async function createProductionRun(input: {
  machine_id: number;
  finished_good_sku: string;
  target_quantity: number;
  planned_start_time: string;
  shift: string;
}) {
  const validated = createProductionRunSchema.parse(input);

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Unauthorized" };
  }

  // Check if machine is already running an active production
  const { data: machine, error: machineError } = await supabase
    .from("machinery")
    .select("id, is_active")
    .eq("id", validated.machine_id)
    .single();

  if (machineError || !machine) {
    return { error: "Machine not found" };
  }

  if (machine.is_active) {
    return { error: "This machine is currently running a production. Wait until the current run is completed." };
  }

  const { data: good, error: goodError } = await supabase
    .from("finished_goods")
    .select("pieces_per_hour, weight, masterbatch_percentage")
    .eq("sku", validated.finished_good_sku)
    .single();

  if (goodError || !good) {
    return { error: "Finished good not found" };
  }

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
    return { error: "Failed to create production run" };
  }

  // Mark machine as active
  await supabase
    .from("machinery")
    .update({ is_active: true })
    .eq("id", validated.machine_id);

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/production");

  return { data: run };
}

export async function completeProductionRun(
  id: string,
  input: {
    completed_at: string;
    actual_shift: string;
    actual_pieces: number;
    actual_raw_kg: number;
    actual_masterbatch_kg: number;
  }
) {
  const validated = completeProductionRunSchema.parse(input);

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Unauthorized" };
  }

  const { data: run, error: fetchError } = await supabase
    .from("production_runs")
    .select("id, status, pieces_per_hour, machine_id, finished_good_sku")
    .eq("id", id)
    .single();

  if (fetchError || !run) {
    return { error: "Production run not found" };
  }

  if (run.status === "Completed" || run.status === "Locked") {
    return { error: `Cannot complete a run with status "${run.status}"` };
  }

  const costs = calculateActualCosts(
    validated.actual_pieces,
    run.pieces_per_hour,
    validated.actual_raw_kg,
    validated.actual_masterbatch_kg
  );

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
    return { error: "Failed to complete production run" };
  }

  // Release the machine
  await supabase
    .from("machinery")
    .update({ is_active: false })
    .eq("id", run.machine_id);

  // Record stock movements for the completed production
  // Finished goods produced (stock in)
  await supabase.from("stock_movements").insert({
    item_type: "finished_good",
    item_sku: run.finished_good_sku,
    direction: "in",
    reason: "production_complete",
    quantity_pieces: validated.actual_pieces,
    reference_id: id,
    created_by: user.id,
  });

  // Raw material consumed (stock out)
  await supabase.from("stock_movements").insert({
    item_type: "raw_material",
    item_sku: run.finished_good_sku,
    direction: "out",
    reason: "production_complete",
    quantity_kg: validated.actual_raw_kg + validated.actual_masterbatch_kg,
    reference_id: id,
    created_by: user.id,
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/production");
  revalidatePath("/dashboard/inventory");

  return { data: updated };
}
