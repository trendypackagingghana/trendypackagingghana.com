import { getProductionRuns } from "./_lib/data";
import ProductionRunCard from "./production-run-card";

export default async function ProductionRunsList({
  status,
}: {
  status?: string;
}) {
  const { data: runs, error } = await getProductionRuns(status);

  if (error) {
    console.error("Production runs error:", error);
    return (
      <div className="text-center py-12 text-destructive">
        Failed to load production runs: {error}
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
      {runs.map((run) => (
        <div key={run.id} className="min-w-[280px] max-w-[320px] flex-shrink-0">
          <ProductionRunCard run={run} />
        </div>
      ))}
    </div>
  );
}
