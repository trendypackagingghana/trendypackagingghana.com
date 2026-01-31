"use client";

import { useState } from "react";
import type { ProductionRun } from "@/types/production";
import CompleteRunDialog from "./complete-run-dialog";
import RunComparisonDialog from "./run-comparison-dialog";

const STATUS_STYLES: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Completed: "bg-blue-100 text-blue-700",
};

export default function ProductionRunCard({ run }: { run: ProductionRun }) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const isCompleted = run.status === "Completed";

  const plannedDate = new Date(run.planned_start_time);
  const dateStr = plannedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
  const timeStr = plannedDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const actualPieces = run.actual_pieces ?? 0;
  const progressPct = isCompleted
    ? Math.min(Math.round((actualPieces / run.target_quantity) * 100), 100)
    : 0;

  // For completed runs, show actual values; for active, show expected
  const displayRawKg = isCompleted
    ? (run.actual_raw_kg ?? run.expected_raw_kg)
    : run.expected_raw_kg;
  const displayMbKg = isCompleted
    ? (run.actual_masterbatch_kg ?? run.expected_masterbatch_kg)
    : run.expected_masterbatch_kg;
  const displayCost = isCompleted
    ? ((run.actual_labour_cost ?? 0) + (run.actual_material_cost ?? 0))
    : (run.expected_labour_cost + run.expected_material_cost);
  const displayShift = isCompleted && run.actual_shift
    ? run.actual_shift
    : run.shift;

  return (
    <>
      <div
        onClick={() => setDialogOpen(true)}
        className="bg-card p-4 sm:p-5 rounded-xl border border-border shadow-sm cursor-pointer
                   hover:shadow-md transition-shadow active:scale-[0.98] active:transition-transform"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-3 sm:mb-4">
          <div className="min-w-0 mr-3">
            <p className="text-sm font-bold mb-0.5 truncate">
              {run.finished_good_sku}
            </p>
            <p className="text-xs text-muted-foreground">
              {dateStr} • {timeStr} Start
            </p>
          </div>
          <span
            className={`shrink-0 px-2 py-1 text-[10px] font-bold rounded uppercase ${
              STATUS_STYLES[run.status] ?? "bg-muted text-muted-foreground"
            }`}
          >
            {run.status}
          </span>
        </div>

        {/* Section label */}
        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-widest mb-2">
          {isCompleted ? "Actual" : "Estimated"}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-3 sm:mb-4">
          <div className="bg-muted/60 rounded-lg p-2 text-center">
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
              {isCompleted ? "Produced" : "Target"}
            </p>
            <p className="text-sm font-bold">
              {isCompleted
                ? actualPieces.toLocaleString()
                : run.target_quantity.toLocaleString()}
            </p>
          </div>
          <div className="bg-muted/60 rounded-lg p-2 text-center">
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
              Pcs/Hr
            </p>
            <p className="text-sm font-bold">{run.pieces_per_hour}</p>
          </div>
          <div className="bg-muted/60 rounded-lg p-2 text-center">
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
              Shift
            </p>
            <p className="text-sm font-bold capitalize">{displayShift}</p>
          </div>
        </div>

        {/* Material & cost summary */}
        <div className="flex justify-between text-xs mb-3 sm:mb-4">
          <div>
            <span className="text-muted-foreground">Raw </span>
            <span className="font-semibold">{displayRawKg} kg</span>
          </div>
          <div>
            <span className="text-muted-foreground">MB </span>
            <span className="font-semibold">{displayMbKg} kg</span>
          </div>
          <div>
            <span className="text-muted-foreground">Cost </span>
            <span className="font-semibold">₵{displayCost.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer */}
        {isCompleted ? (
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-medium">
              <span>Completed</span>
              <span>
                {actualPieces.toLocaleString()} pcs ({progressPct}%)
              </span>
            </div>
            <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">
              Est.{" "}
              <span className="text-foreground font-semibold">
                {run.expected_hours} hrs
              </span>
            </span>
            <span className="material-symbols-outlined text-base text-muted-foreground">
              visibility
            </span>
          </div>
        )}
      </div>

      {/* Active → completion dialog; Completed → read-only comparison */}
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
            weight_per_bag_kg: run.finished_goods?.production_materials?.weight_per_bag_kg ?? null,
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
