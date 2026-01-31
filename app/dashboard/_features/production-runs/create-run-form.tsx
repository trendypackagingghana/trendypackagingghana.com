"use client";

import { useState, useEffect } from "react";
import {
  calculateExpectedValues,
  type ProductionRunExpected,
} from "@/lib/calculations/production-run";
import { createProductionRun } from "@/lib/actions/production-runs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Machine, FinishedGood } from "@/types/production";

type Step = "form" | "preview";

export default function CreateRunForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>("form");

  const [machines, setMachines] = useState<Machine[]>([]);
  const [goods, setGoods] = useState<FinishedGood[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [machineId, setMachineId] = useState<number | "">("");
  const [company, setCompany] = useState("");
  const [sku, setSku] = useState("");
  const [targetBags, setTargetBags] = useState<number | "">("");
  const [targetLoosePieces, setTargetLoosePieces] = useState<number | "">("");
  const [startTime, setStartTime] = useState(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  });
  const [shift, setShift] = useState<"morning" | "night">("morning");

  const [preview, setPreview] = useState<ProductionRunExpected | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedMachine = machines.find((m) => m.id === machineId);
  const goodsForMachine = selectedMachine
    ? goods.filter((g) => g.machine_type === selectedMachine.machine_type)
    : [];
  const companies = [...new Set(goodsForMachine.map((g) => g.company))].sort();
  const filteredGoods = company
    ? goodsForMachine.filter((g) => g.company === company)
    : [];
  const selectedGood = goods.find((g) => g.sku === sku);
  const piecesPerBag = selectedGood?.pieces_per_bag ?? 0;
  const targetQty =
    (Number(targetBags) || 0) * piecesPerBag + (Number(targetLoosePieces) || 0);

  useEffect(() => {
    Promise.all([
      fetch("/api/machinery").then((r) => r.json()),
      fetch("/api/finished_goods").then((r) => r.json()),
    ])
      .then(([m, g]) => {
        setMachines(Array.isArray(m) ? m : []);
        setGoods(Array.isArray(g) ? g : []);
        setLoadingData(false);
      })
      .catch(() => {
        setError("Failed to load form data");
        setLoadingData(false);
      });
  }, []);

  function handlePreview() {
    if (!machineId || !sku || !targetQty || !startTime) {
      setError("All fields are required");
      return;
    }
    if (!selectedGood) {
      setError("Invalid finished good");
      return;
    }

    const expected = calculateExpectedValues(targetQty, selectedGood);
    setPreview(expected);
    setError(null);
    setStep("preview");
  }

  async function handleConfirm() {
    setSubmitting(true);
    setError(null);

    try {
      const isoStart = new Date(startTime).toISOString();
      const result = await createProductionRun({
        machine_id: Number(machineId),
        finished_good_sku: sku,
        target_quantity: targetQty,
        planned_start_time: isoStart,
        shift,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      onClose();
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  }

  function formatLabel(good: FinishedGood) {
    const parts = [];
    if (good.size) parts.push(good.size);
    parts.push(good.color, `(${good.category})`);
    return parts.join(" ");
  }

  if (loadingData) {
    return (
      <div className="text-center py-12 text-muted-foreground">Loading...</div>
    );
  }

  if (step === "form") {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="machine">Machine</Label>
          <select
            id="machine"
            value={machineId}
            onChange={(e) => {
              setMachineId(e.target.value ? Number(e.target.value) : "");
              setCompany("");
              setSku("");
            }}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
          >
            <option value="">Select a machine</option>
            {machines.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <select
            id="company"
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              setSku("");
            }}
            disabled={!machineId}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              {machineId ? "Select a company" : "Select a machine first"}
            </option>
            {companies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="finished-good">Finished Good</Label>
          <select
            id="finished-good"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            disabled={!company}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              {company ? "Select a finished good" : "Select a company first"}
            </option>
            {filteredGoods.map((g) => (
              <option key={g.sku} value={g.sku}>
                {g.sku} — {formatLabel(g)}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-bags">
            Target Bags
            {piecesPerBag > 0 && (
              <span className="text-muted-foreground font-normal">
                {" "}({piecesPerBag} pcs/bag)
              </span>
            )}
          </Label>
          <Input
            id="target-bags"
            type="text"
            inputMode="numeric"
            value={targetBags === "" ? "" : Number(targetBags).toLocaleString()}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (raw === "") {
                setTargetBags("");
              } else if (/^\d+$/.test(raw)) {
                setTargetBags(Number(raw));
              }
            }}
            placeholder="e.g. 10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="target-loose-pieces">Loose Pieces</Label>
          <Input
            id="target-loose-pieces"
            type="text"
            inputMode="numeric"
            value={targetLoosePieces === "" ? "" : Number(targetLoosePieces).toLocaleString()}
            onChange={(e) => {
              const raw = e.target.value.replace(/,/g, "");
              if (raw === "") {
                setTargetLoosePieces("");
              } else if (/^\d+$/.test(raw)) {
                setTargetLoosePieces(Number(raw));
              }
            }}
            placeholder="e.g. 250"
          />
        </div>

        {targetQty > 0 && (
          <div className="rounded-md bg-muted/60 p-3 text-sm">
            <span className="text-muted-foreground">Total target pieces: </span>
            <span className="font-semibold">{targetQty.toLocaleString()}</span>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="start-time">Planned Start Time</Label>
          <Input
            id="start-time"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Shift</Label>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={shift === "morning" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setShift("morning")}
            >
              Morning
            </Button>
            <Button
              type="button"
              variant={shift === "night" ? "default" : "outline"}
              className="flex-1"
              onClick={() => setShift("night")}
            >
              Night
            </Button>
          </div>
        </div>

        {error && (
          <div className="text-sm text-destructive text-center">{error}</div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="button" className="flex-1" onClick={handlePreview}>
            Preview
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-muted/50 p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Machine</span>
          <span className="font-medium">
            {machines.find((m) => m.id === machineId)?.name}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Finished Good</span>
          <span className="font-medium">{sku}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Target Quantity</span>
          <span className="font-medium">
            {targetQty.toLocaleString()} pcs
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shift</span>
          <span className="font-medium capitalize">{shift}</span>
        </div>
      </div>

      {preview && (
        <div className="space-y-3">
          <Separator />
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Expected Values
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <ValueCard
              label="Production Hours"
              value={`${preview.expected_hours} hrs`}
            />
            <ValueCard
              label="Pieces/Hour"
              value={`${preview.pieces_per_hour}`}
            />
            <ValueCard
              label="Raw Material"
              value={`${preview.expected_raw_kg} kg`}
            />
            <ValueCard
              label="Masterbatch"
              value={`${preview.expected_masterbatch_kg} kg`}
            />
            <ValueCard
              label="Labour Cost"
              value={`₵${preview.expected_labour_cost.toFixed(2)}`}
            />
            <ValueCard
              label="Material Cost"
              value={`₵${preview.expected_material_cost.toFixed(2)}`}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="text-sm text-destructive text-center">{error}</div>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => {
            setStep("form");
            setError(null);
          }}
        >
          Back
        </Button>
        <Button
          type="button"
          className="flex-1"
          onClick={handleConfirm}
          disabled={submitting}
        >
          {submitting ? "Creating..." : "Confirm"}
        </Button>
      </div>
    </div>
  );
}

function ValueCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/50 p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
