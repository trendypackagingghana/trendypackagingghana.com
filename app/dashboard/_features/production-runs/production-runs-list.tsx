import { getProductionRuns } from "./_lib/data";
import ProductionRunRow from "./production-run-row";

export default async function ProductionRunsList({
  status,
  dateFrom,
  dateTo,
}: {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  const { data: runs, error } = await getProductionRuns(status, dateFrom, dateTo);

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
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="px-4 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                SKU
              </th>
              <th className="px-4 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Date
              </th>
              <th className="px-4 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Shift
              </th>
              <th className="px-4 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">
                Target
              </th>
              <th className="px-4 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right hidden sm:table-cell">
                Actual
              </th>
              <th className="px-4 sm:px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {runs.map((run) => (
              <ProductionRunRow key={run.id} run={run} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
