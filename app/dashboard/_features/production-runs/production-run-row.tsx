"use client";

import { useState } from "react";
import type { ProductionRun } from "@/types/production";
import CompleteRunDialog from "./complete-run-dialog";
import RunComparisonDialog from "./run-comparison-dialog";

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Completed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function ProductionRunRow({ run }: { run: ProductionRun }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const isCompleted = run.status === "Completed";

  const plannedDate = new Date(run.planned_start_time);
  const dateStr = plannedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const actualPieces = run.actual_pieces ?? 0;
  const displayShift = isCompleted && run.actual_shift ? run.actual_shift : run.shift;
  return (
    <>
      <tr
        onClick={() => setDialogOpen(true)}
        className="hover:bg-muted/50 transition-colors cursor-pointer"
      >
        <td className="px-4 sm:px-6 py-4 text-sm font-bold">
          {run.finished_good_sku}
        </td>
        <td className="px-4 sm:px-6 py-4 text-sm text-muted-foreground">
          {dateStr}
        </td>
        <td className="px-4 sm:px-6 py-4 text-sm capitalize">
          {displayShift}
        </td>
        <td className="px-4 sm:px-6 py-4 text-sm font-medium text-right">
          {run.target_quantity.toLocaleString()}
        </td>
        <td className="px-4 sm:px-6 py-4 text-sm font-medium text-right hidden sm:table-cell">
          {isCompleted ? actualPieces.toLocaleString() : "—"}
        </td>
        <td className="px-4 sm:px-6 py-4">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
              STATUS_STYLES[run.status] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {run.status}
          </span>
        </td>
      </tr>

      {isCompleted ? (
        <RunComparisonDialog
          run={run}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      ) : (
        <CompleteRunDialog
          run={{
            id: run.id,
            finished_good_sku: run.finished_good_sku,
            target_quantity: run.target_quantity,
            pieces_per_hour: run.pieces_per_hour,
            pieces_per_bag: run.finished_goods?.pieces_per_bag ?? null,
            weight_per_bag_kg:
              run.finished_goods?.production_materials?.weight_per_bag_kg ?? null,
            expected_raw_kg: run.expected_raw_kg,
            expected_masterbatch_kg: run.expected_masterbatch_kg,
            expected_labour_cost: run.expected_labour_cost,
            expected_material_cost: run.expected_material_cost,
          }}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </>
  );
}
