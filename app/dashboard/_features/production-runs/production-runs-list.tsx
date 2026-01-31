import { createClient } from "@/lib/supabase/server";
import type { ProductionRun } from "../../_lib/types";
import ProductionRunCard from "./production-run-card";

const VALID_STATUSES = ["Active", "Completed"];
const STATUS_ORDER: Record<string, number> = { Active: 0, Completed: 1 };

export default async function ProductionRunsList({
  status,
}: {
  status?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("production_runs")
    .select("*, finished_goods(pieces_per_bag)")
    .order("planned_start_time", { ascending: false });

  if (status && VALID_STATUSES.includes(status)) {
    query = query.eq("status", status);
  }

  const { data: runs, error } = await query;

  // When showing all, group Active first then Completed, each latest-first
  if (!error && runs && (!status || !VALID_STATUSES.includes(status))) {
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

  if (error) {
    console.error("Production runs error:", error);
    return (
      <div className="text-center py-12 text-destructive">
        Failed to load production runs: {error.message}
      </div>
    );
  }

  if (!runs || runs.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <span className="material-symbols-outlined text-5xl mb-4 block">
          manufacturing
        </span>
        <p className="text-lg font-medium">No production runs found</p>
        <p className="text-sm mt-1">
          Tap the + button to create a new production run.
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 scrollbar-thin">
      {runs.map((run: ProductionRun) => (
        <div key={run.id} className="min-w-[280px] max-w-[320px] flex-shrink-0">
          <ProductionRunCard run={run} />
        </div>
      ))}
    </div>
  );
}
