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

export interface MonthlyRunData {
  day: number;
  currentMonth: number;
  lastMonth: number;
}

export async function getMonthlyComparison(): Promise<MonthlyRunData[]> {
  const supabase = await createClient();

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed

  const currentStart = new Date(currentYear, currentMonth, 1).toISOString();
  const currentEnd = new Date(currentYear, currentMonth + 1, 1).toISOString();
  const lastStart = new Date(currentYear, currentMonth - 1, 1).toISOString();
  const lastEnd = currentStart;

  const [{ data: currentRuns }, { data: lastRuns }] = await Promise.all([
    supabase
      .from("production_runs")
      .select("planned_start_time")
      .gte("planned_start_time", currentStart)
      .lt("planned_start_time", currentEnd),
    supabase
      .from("production_runs")
      .select("planned_start_time")
      .gte("planned_start_time", lastStart)
      .lt("planned_start_time", lastEnd),
  ]);

  // Days in each month
  const daysInCurrent = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInLast = new Date(currentYear, currentMonth, 0).getDate();
  const maxDays = Math.max(daysInCurrent, daysInLast);

  // Build per-day counts
  const currentCounts = new Map<number, number>();
  const lastCounts = new Map<number, number>();

  for (const run of currentRuns ?? []) {
    const day = new Date(run.planned_start_time).getDate();
    currentCounts.set(day, (currentCounts.get(day) ?? 0) + 1);
  }
  for (const run of lastRuns ?? []) {
    const day = new Date(run.planned_start_time).getDate();
    lastCounts.set(day, (lastCounts.get(day) ?? 0) + 1);
  }

  // Accumulate
  const result: MonthlyRunData[] = [];
  let cumCurrent = 0;
  let cumLast = 0;

  for (let d = 1; d <= maxDays; d++) {
    cumCurrent += currentCounts.get(d) ?? 0;
    cumLast += lastCounts.get(d) ?? 0;
    result.push({
      day: d,
      currentMonth: cumCurrent,
      lastMonth: d <= daysInLast ? cumLast : cumLast,
    });
  }

  return result;
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
