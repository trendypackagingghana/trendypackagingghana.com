"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCTION_CONSTANTS } from "@/lib/constants/production";
import type { ProductionRunSummary } from "../../_lib/types";

type Step = "form" | "comparison";

interface FormValues {
  completed_at: string;
  actual_shift: string;
  actual_bags: string;
  actual_loose_pieces: string;
  actual_raw_kg: string;
  actual_masterbatch_kg: string;
}

function computePreviewCosts(
  actualPieces: number,
  piecesPerHour: number,
  actualRawKg: number,
  actualMasterbatchKg: number
) {
  const {
    OPERATORS_PER_MACHINE,
    LABOUR_COST_PER_HOUR,
    RAW_COST_PER_KG,
    MASTERBATCH_COST_PER_KG,
  } = PRODUCTION_CONSTANTS;

  const hours = actualPieces / piecesPerHour;
  return {
    labour:
      Math.round(hours * OPERATORS_PER_MACHINE * LABOUR_COST_PER_HOUR * 100) /
      100,
    material:
      Math.round(
        (actualRawKg * RAW_COST_PER_KG +
          actualMasterbatchKg * MASTERBATCH_COST_PER_KG) *
          100
      ) / 100,
  };
}

// ---------------------------------------------------------------------------
// Main dialog
// ---------------------------------------------------------------------------

interface CompleteRunDialogProps {
  run: ProductionRunSummary;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CompleteRunDialog({
  run,
  open,
  onOpenChange,
}: CompleteRunDialogProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormValues>({
    completed_at: new Date().toISOString().slice(0, 16),
    actual_shift: "",
    actual_bags: "",
    actual_loose_pieces: "",
    actual_raw_kg: "",
    actual_masterbatch_kg: "",
  });

  const piecesPerBag = run.pieces_per_bag ?? 0;
  const bags = Number(form.actual_bags) || 0;
  const loosePieces = Number(form.actual_loose_pieces) || 0;
  const pieces = bags * piecesPerBag + loosePieces;
  const rawKg = Number(form.actual_raw_kg);
  const mbKg = Number(form.actual_masterbatch_kg);

  const formValid =
    form.completed_at &&
    form.actual_shift &&
    pieces > 0 &&
    rawKg > 0 &&
    mbKg > 0;

  const preview = formValid
    ? computePreviewCosts(pieces, run.pieces_per_hour, rawKg, mbKg)
    : null;

  function handleCompare() {
    if (!formValid) return;
    setError(null);
    setStep("comparison");
  }

  function handleBack() {
    setStep("form");
    setError(null);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setStep("form");
      setError(null);
      setSubmitting(false);
    }
    onOpenChange(nextOpen);
  }

  async function handleComplete() {
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/production-runs/${run.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed_at: new Date(form.completed_at).toISOString(),
          actual_shift: form.actual_shift,
          actual_pieces: pieces,
          actual_raw_kg: rawKg,
          actual_masterbatch_kg: mbKg,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to complete run");
      }

      router.refresh();
      handleOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {step === "form" ? "Complete Production Run" : "Review & Confirm"}
          </DialogTitle>
          <DialogDescription>
            {step === "form"
              ? `Enter actual values for ${run.finished_good_sku}`
              : "Compare expected vs actual values before completing"}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {step === "form" ? (
          <FormStep form={form} setForm={setForm} piecesPerBag={piecesPerBag} totalPieces={pieces} />
        ) : (
          <ComparisonStep run={run} form={form} preview={preview!} totalPieces={pieces} />
        )}

        <DialogFooter>
          {step === "form" ? (
            <Button onClick={handleCompare} disabled={!formValid}>
              Compare
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={submitting}
              >
                Back
              </Button>
              <Button onClick={handleComplete} disabled={submitting}>
                {submitting ? "Completing…" : "Complete Run"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------------------------------------------------------------------------
// Form step
// ---------------------------------------------------------------------------

function FormStep({
  form,
  setForm,
  piecesPerBag,
  totalPieces,
}: {
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  piecesPerBag: number;
  totalPieces: number;
}) {
  function update(field: keyof FormValues, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="completed_at">Date Completed</Label>
        <Input
          id="completed_at"
          type="datetime-local"
          value={form.completed_at}
          onChange={(e) => update("completed_at", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="actual_shift">Shift</Label>
        <Select
          value={form.actual_shift}
          onValueChange={(v) => update("actual_shift", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select shift" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="morning">Morning</SelectItem>
            <SelectItem value="night">Night</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="actual_bags">
          Bags Produced
          {piecesPerBag > 0 && (
            <span className="text-muted-foreground font-normal">
              {" "}({piecesPerBag} pcs/bag)
            </span>
          )}
        </Label>
        <Input
          id="actual_bags"
          type="number"
          min="0"
          step="1"
          placeholder="e.g. 10"
          value={form.actual_bags}
          onChange={(e) => update("actual_bags", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="actual_loose_pieces">Loose Pieces</Label>
        <Input
          id="actual_loose_pieces"
          type="number"
          min="0"
          step="1"
          placeholder="e.g. 250"
          value={form.actual_loose_pieces}
          onChange={(e) => update("actual_loose_pieces", e.target.value)}
        />
      </div>

      {totalPieces > 0 && (
        <div className="rounded-md bg-muted/60 p-3 text-sm">
          <span className="text-muted-foreground">Total pieces: </span>
          <span className="font-semibold">{totalPieces.toLocaleString()}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="actual_raw_kg">Raw Material Used (kg)</Label>
        <Input
          id="actual_raw_kg"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="e.g. 120.5"
          value={form.actual_raw_kg}
          onChange={(e) => update("actual_raw_kg", e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="actual_masterbatch_kg">Masterbatch Used (kg)</Label>
        <Input
          id="actual_masterbatch_kg"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="e.g. 2.4"
          value={form.actual_masterbatch_kg}
          onChange={(e) => update("actual_masterbatch_kg", e.target.value)}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Comparison step
// ---------------------------------------------------------------------------

function ComparisonStep({
  run,
  form,
  preview,
  totalPieces,
}: {
  run: ProductionRunSummary;
  form: FormValues;
  preview: { labour: number; material: number };
  totalPieces: number;
}) {
  const rawKg = Number(form.actual_raw_kg);
  const mbKg = Number(form.actual_masterbatch_kg);

  const rows = [
    {
      label: "Pieces",
      expected: run.target_quantity,
      actual: totalPieces,
      format: (v: number) => v.toLocaleString(),
    },
    {
      label: "Raw Material (kg)",
      expected: run.expected_raw_kg,
      actual: rawKg,
      format: (v: number) => v.toFixed(2),
    },
    {
      label: "Masterbatch (kg)",
      expected: run.expected_masterbatch_kg,
      actual: mbKg,
      format: (v: number) => v.toFixed(2),
    },
    {
      label: "Labour Cost (₵)",
      expected: run.expected_labour_cost,
      actual: preview.labour,
      format: (v: number) => v.toFixed(2),
    },
    {
      label: "Material Cost (₵)",
      expected: run.expected_material_cost,
      actual: preview.material,
      format: (v: number) => v.toFixed(2),
    },
  ];

  return (
    <div className="space-y-3">
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
                <div className="text-xs text-muted-foreground">{row.label}</div>
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
    </div>
  );
}
