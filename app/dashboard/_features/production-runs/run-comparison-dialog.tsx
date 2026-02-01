"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ProductionRun } from "@/types/production";

interface RunComparisonDialogProps {
  run: ProductionRun;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RunComparisonDialog({
  run,
  open,
  onOpenChange,
}: RunComparisonDialogProps) {
  const completedDate = run.completed_at
    ? new Date(run.completed_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

  const rows = [
    {
      label: "Pieces",
      expected: run.target_quantity,
      actual: run.actual_pieces ?? 0,
      format: (v: number) => v.toLocaleString(),
    },
    {
      label: "Raw Material (kg)",
      expected: run.expected_raw_kg,
      actual: run.actual_raw_kg ?? 0,
      format: (v: number) => v.toFixed(2),
    },
    {
      label: "Masterbatch (kg)",
      expected: run.expected_masterbatch_kg,
      actual: run.actual_masterbatch_kg ?? 0,
      format: (v: number) => v.toFixed(2),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Run Comparison</DialogTitle>
          <DialogDescription>
            {run.finished_good_sku} — completed {completedDate}
            {run.actual_shift && (
              <span className="capitalize"> ({run.actual_shift} shift)</span>
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Desktop table */}
        <div className="hidden md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="py-2 font-medium">Metric</th>
                <th className="py-2 font-medium">Expected</th>
                <th className="py-2 font-medium">Actual</th>
                <th className="py-2 font-medium text-right">Variance</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const variance = row.actual - row.expected;
                return (
                  <tr key={row.label} className="border-b last:border-0">
                    <td className="py-2 text-muted-foreground">{row.label}</td>
                    <td className="py-2">{row.format(row.expected)}</td>
                    <td className="py-2">{row.format(row.actual)}</td>
                    <td
                      className={`py-2 text-right font-medium ${
                        variance > 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {variance > 0 ? "+" : ""}
                      {row.format(variance)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile stacked */}
        <div className="md:hidden space-y-4">
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Expected
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-md border p-2 text-center"
                >
                  <div className="text-xs text-muted-foreground">
                    {row.label}
                  </div>
                  <div className="text-sm font-medium">
                    {row.format(row.expected)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
              Actual
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {rows.map((row) => {
                const variance = row.actual - row.expected;
                return (
                  <div
                    key={row.label}
                    className="rounded-md border p-2 text-center"
                  >
                    <div className="text-xs text-muted-foreground">
                      {row.label}
                    </div>
                    <div className="text-sm font-medium">
                      {row.format(row.actual)}
                    </div>
                    <div
                      className={`text-xs font-medium ${
                        variance > 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {variance > 0 ? "+" : ""}
                      {row.format(variance)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
