/** Shape returned by the production_runs list query. */
export interface ProductionRun {
  id: string;
  finished_good_sku: string;
  target_quantity: number;
  planned_start_time: string;
  shift: string;
  status: string;
  pieces_per_hour: number;
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
  finished_goods: {
    pieces_per_bag: number | null;
    production_materials: { weight_per_bag_kg: number } | null;
  } | null;
}

/** Subset of ProductionRun needed by the completion dialog. */
export interface ProductionRunSummary {
  id: string;
  finished_good_sku: string;
  target_quantity: number;
  pieces_per_hour: number;
  pieces_per_bag: number | null;
  weight_per_bag_kg: number | null;
  expected_raw_kg: number;
  expected_masterbatch_kg: number;
  expected_labour_cost: number;
  expected_material_cost: number;
}

/** Machine from the machinery table. */
export interface Machine {
  id: number;
  name: string;
  machine_type: string;
}

/** Finished good from the finished_goods table. */
export interface FinishedGood {
  sku: string;
  category: string;
  company: string;
  size: string | null;
  color: string;
  pieces_per_hour: number;
  pieces_per_bag: number | null;
  weight: string;
  masterbatch_percentage: string;
  machine_type: string;
}
