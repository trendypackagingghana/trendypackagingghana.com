"use client";

import { useState, useEffect } from "react";
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
import { manualStockAdjustment } from "@/lib/actions/stock";
import SuccessDialog from "@/components/ui/success-dialog";
import type { FinishedGood } from "@/types/production";

interface RawMaterial {
  sku: string;
  name: string;
  category: string;
}

interface AdjustStockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemType: "finished_good" | "raw_material";
  preselectedSku?: string;
}

export default function AdjustStockDialog({
  open,
  onOpenChange,
  itemType,
  preselectedSku,
}: AdjustStockDialogProps) {
  const [goods, setGoods] = useState<FinishedGood[]>([]);
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [loading, setLoading] = useState(false);

  const [company, setCompany] = useState("");
  const [sku, setSku] = useState("");
  const [direction, setDirection] = useState<"in" | "out">("in");
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const unit = itemType === "finished_good" ? "pieces" : "bags";

  // Cascading filters for finished goods
  const companies = [...new Set(goods.map((g) => g.company))].sort();
  const filteredGoods = company
    ? goods.filter((g) => g.company === company)
    : [];

  useEffect(() => {
    if (open && preselectedSku) {
      setSku(preselectedSku);
      if (itemType === "finished_good") {
        const match = goods.find((g) => g.sku === preselectedSku);
        if (match) setCompany(match.company);
      }
    }
  }, [open, preselectedSku, goods, itemType]);

  useEffect(() => {
    if (!open) return;
    setLoading(true);

    if (itemType === "finished_good") {
      fetch("/api/finished_goods")
        .then((r) => r.json())
        .then((data) => setGoods(Array.isArray(data) ? data : []))
        .catch(() => setError("Failed to load finished goods"))
        .finally(() => setLoading(false));
    } else {
      fetch("/api/raw_materials")
        .then((r) => r.json())
        .then((data) => setRawMaterials(Array.isArray(data) ? data : []))
        .catch(() => setError("Failed to load raw materials"))
        .finally(() => setLoading(false));
    }
  }, [open, itemType]);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setCompany("");
      setSku("");
      setDirection("in");
      setQuantity("");
      setNote("");
      setError(null);
      setSubmitting(false);
      setShowSuccess(false);
    }
    onOpenChange(nextOpen);
  }

  function formatGoodLabel(good: FinishedGood) {
    const parts = [];
    if (good.size) parts.push(good.size);
    parts.push(good.color, `(${good.category})`);
    return parts.join(" ");
  }

  async function handleSubmit() {
    if (!sku || !quantity || Number(quantity) <= 0) {
      setError("Please select an item and enter a valid quantity");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const result = await manualStockAdjustment({
        item_type: itemType,
        item_sku: sku,
        direction,
        quantity: Number(quantity),
        note: note || undefined,
      });

      if (result.error) {
        setError(result.error);
        return;
      }

      setShowSuccess(true);
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  }

  const selectClass =
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none disabled:cursor-not-allowed disabled:opacity-50";

  if (showSuccess) {
    return (
      <SuccessDialog
        open={open}
        onClose={() => handleOpenChange(false)}
        message="Stock adjusted successfully."
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Adjust Stock</DialogTitle>
          <DialogDescription>
            Manually adjust{" "}
            {itemType === "finished_good"
              ? "finished goods"
              : "raw material"}{" "}
            stock
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading...
          </div>
        ) : (
          <div className="space-y-4">
            {itemType === "finished_good" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="adj-company">Company</Label>
                  <select
                    id="adj-company"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value);
                      setSku("");
                    }}
                    disabled={!!preselectedSku}
                    className={selectClass}
                  >
                    <option value="">Select a company</option>
                    {companies.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="adj-good">Finished Good</Label>
                  <select
                    id="adj-good"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    disabled={!company || !!preselectedSku}
                    className={selectClass}
                  >
                    <option value="">
                      {company
                        ? "Select a finished good"
                        : "Select a company first"}
                    </option>
                    {filteredGoods.map((g) => (
                      <option key={g.sku} value={g.sku}>
                        {g.sku} — {formatGoodLabel(g)}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="adj-raw">Raw Material</Label>
                <select
                  id="adj-raw"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  disabled={!!preselectedSku}
                  className={selectClass}
                >
                  <option value="">Select a raw material</option>
                  {rawMaterials.map((m) => (
                    <option key={m.sku} value={m.sku}>
                      {m.sku} — {m.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Direction</Label>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={direction === "in" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setDirection("in")}
                >
                  Stock In
                </Button>
                <Button
                  type="button"
                  variant={direction === "out" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setDirection("out")}
                >
                  Stock Out
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adj-quantity">Quantity ({unit})</Label>
              <Input
                id="adj-quantity"
                type="number"
                min="1"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adj-note">Note (optional)</Label>
              <Input
                id="adj-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Supplier delivery, stock count correction"
              />
            </div>

            {error && (
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={submitting || loading}>
            {submitting ? "Saving..." : "Confirm Adjustment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
