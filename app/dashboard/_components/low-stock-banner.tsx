"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function LowStockBanner({ alerts }: { alerts: string[] }) {
  const [open, setOpen] = useState(false);

  if (alerts.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-amber-50 border-b border-amber-100 px-4 py-2 hover:bg-amber-100 transition-colors"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
        </span>
        <span className="text-xs sm:text-sm font-semibold text-amber-800">
          Warning — {alerts.length} low stock {alerts.length === 1 ? "item" : "items"}
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Low Stock Alerts</DialogTitle>
            <DialogDescription>
              Raw materials below the minimum threshold
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {alerts.map((message, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-amber-50 border border-amber-100 p-3 rounded-xl"
              >
                <span className="material-symbols-outlined text-amber-500 shrink-0 text-lg">
                  warning
                </span>
                <p className="flex-1 text-xs sm:text-sm font-semibold text-amber-800 leading-snug">
                  {message}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
