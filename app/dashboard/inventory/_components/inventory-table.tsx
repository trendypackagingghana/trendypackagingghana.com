"use client";

import { useState } from "react";
import { InventoryItem } from "@/types/inventory";
import AdjustStockDialog from "./adjust-stock-dialog";

interface InventoryTableProps {
  finishedGoods: InventoryItem[];
  rawMaterials: InventoryItem[];
}

export function InventoryTable({
  finishedGoods,
  rawMaterials,
}: InventoryTableProps) {
  const [tab, setTab] = useState<"finished" | "raw">("finished");
  const [filter, setFilter] = useState("");
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [adjustSku, setAdjustSku] = useState<string | undefined>(undefined);

  const items = tab === "finished" ? finishedGoods : rawMaterials;

  const sortedItems = [...items].sort((a, b) => a.sku.localeCompare(b.sku));

  const filteredItems = sortedItems.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase()) ||
    item.sku.toLowerCase().includes(filter.toLowerCase())
  );

  const handleTabChange = (newTab: "finished" | "raw") => {
    setTab(newTab);
    setFilter("");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border px-6">
        <button
          onClick={() => handleTabChange("finished")}
          className={`px-4 py-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            tab === "finished"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="material-symbols-outlined text-lg">check_box</span>
          Finished Goods
        </button>
        <button
          onClick={() => handleTabChange("raw")}
          className={`px-4 py-4 text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
            tab === "raw"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <span className="material-symbols-outlined text-lg">layers</span>
          Raw Materials
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center p-4 border-b border-border bg-muted/30">
        <div className="relative">
          <span className="absolute left-2.5 top-2.5 material-symbols-outlined text-lg text-muted-foreground">search</span>
          <input
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={handleFilterChange}
            className="pl-9 h-9 text-sm rounded-lg border border-input bg-background w-64 focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[460px]">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-muted/50 border-b border-border">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/50">
                SKU
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/50">
                Item Name
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/50">
                Category
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right bg-muted/50">
                Current Stock
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/50">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/50">
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredItems.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                        No items found.
                    </td>
                </tr>
            ) : (
                filteredItems.map((item) => (
                <tr
                    key={item.sku}
                    className="hover:bg-muted/50 transition-colors"
                >
                    <td className="px-6 py-4 text-sm text-muted-foreground font-medium">
                    {item.sku}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">
                    {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground border border-border">
                        {item.category}
                    </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-right">
                    {item.current_stock.toLocaleString()} <span className="text-muted-foreground font-medium">{item.unit}</span>
                    </td>
                    <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                    </td>
                    <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setAdjustSku(item.sku);
                            setAdjustOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                          Adjust
                        </button>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-border">
        <p className="text-sm text-muted-foreground">
          {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
        </p>
      </div>

      <AdjustStockDialog
        open={adjustOpen}
        onOpenChange={(open) => { setAdjustOpen(open); if (!open) setAdjustSku(undefined); }}
        itemType={tab === "finished" ? "finished_good" : "raw_material"}
        preselectedSku={adjustSku}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: InventoryItem["status"] }) {
    if (status === "In Stock") {
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                In Stock
            </span>
        )
    }
    if (status === "Low Stock") {
        return (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                Low Stock
            </span>
        )
    }
    return (
        <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold leading-none bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            Out of Stock
        </span>
    )
}
