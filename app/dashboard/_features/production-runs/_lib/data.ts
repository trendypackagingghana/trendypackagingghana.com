import { createClient } from "@/lib/supabase/server";
import type { ProductionRun } from "@/types/production";

const VALID_STATUSES = ["Active", "Completed"];
const STATUS_ORDER: Record<string, number> = { Active: 0, Completed: 1 };

export async function getProductionRuns(status?: string): Promise<{
  data: ProductionRun[] | null;
  error: string | null;
}> {
  const supabase = await createClient();

  let query = supabase
    .from("production_runs")
    .select(
      "id, finished_good_sku, target_quantity, planned_start_time, shift, status, pieces_per_hour, expected_hours, expected_raw_kg, expected_masterbatch_kg, expected_labour_cost, expected_material_cost, actual_pieces, actual_raw_kg, actual_masterbatch_kg, actual_labour_cost, actual_material_cost, actual_shift, completed_at, finished_goods(pieces_per_bag, production_materials(weight_per_bag_kg))"
    )
    .order("planned_start_time", { ascending: false });

  if (status && VALID_STATUSES.includes(status)) {
    query = query.eq("status", status);
  }

  const { data: runs, error } = await query;

  if (error) {
    return { data: null, error: error.message };
  }

  // When showing all, group Active first then Completed, each latest-first
  if (runs && (!status || !VALID_STATUSES.includes(status))) {
    runs.sort((a, b) => {
      const sa = STATUS_ORDER[a.status as string] ?? 2;
      const sb = STATUS_ORDER[b.status as string] ?? 2;
      if (sa !== sb) return sa - sb;
      return (
        new Date(b.planned_start_time as string).getTime() -
        new Date(a.planned_start_time as string).getTime()
      );
    });
  }

  return { data: runs as unknown as ProductionRun[], error: null };
}

const LOW_STOCK_THRESHOLD = 11;

export async function getLowStockAlerts(): Promise<string[]> {
  const supabase = await createClient();
  const alerts: string[] = [];

  const { data: rawMaterials } = await supabase
    .from("raw_material_stock")
    .select("material_sku, quantity_bags")
    .lt("quantity_bags", LOW_STOCK_THRESHOLD);

  if (rawMaterials && rawMaterials.length > 0) {
    for (const item of rawMaterials) {
      alerts.push(
        `Raw material "${item.material_sku}" is low — ${item.quantity_bags} bags remaining`
      );
    }
  }

  return alerts;
}
