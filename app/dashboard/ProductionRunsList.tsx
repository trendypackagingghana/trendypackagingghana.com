import { createClient } from "@/lib/supabase/server";
import ProductionRunCard from "./ProductionRunCard";

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
    .select("*")
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {runs.map((run: Record<string, unknown>) => (
        <ProductionRunCard key={run.id as string} run={run} />
      ))}
    </div>
  );
}
