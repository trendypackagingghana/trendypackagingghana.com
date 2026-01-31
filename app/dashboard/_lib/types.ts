/** Canonical shape of a production_runs row from Supabase. */
export interface ProductionRun {
  id: string;
  machine_id: number;
  finished_good_sku: string;
  target_quantity: number;
  planned_start_time: string;
  shift: string;
  status: string;
  pieces_per_hour: number;
  weight_grams: number;
  masterbatch_pct: number;
  expected_hours: number;
  expected_raw_kg: number;
  expected_masterbatch_kg: number;
  expected_labour_cost: number;
  expected_material_cost: number;
  actual_pieces: number | null;
  actual_raw_kg: number | null;
  actual_masterbatch_kg: number | null;
  actual_labour_cost: number | null;
  actual_material_cost: number | null;
  actual_shift: string | null;
  completed_at: string | null;
  created_by: string;
  created_at: string;
  finished_goods: { pieces_per_bag: number | null } | null;
}

/** Subset of ProductionRun needed by the completion dialog. */
export interface ProductionRunSummary {
  id: string;
  finished_good_sku: string;
  target_quantity: number;
  pieces_per_hour: number;
  pieces_per_bag: number | null;
  expected_raw_kg: number;
  expected_masterbatch_kg: number;
  expected_labour_cost: number;
  expected_material_cost: number;
}
