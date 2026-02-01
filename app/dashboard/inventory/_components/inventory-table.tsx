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
  const [currentPage, setCurrentPage] = useState(1);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const ITEMS_PER_PAGE = 10;

  const items = tab === "finished" ? finishedGoods : rawMaterials;
  
  const filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase()) || 
      item.sku.toLowerCase().includes(filter.toLowerCase())
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleTabChange = (newTab: "finished" | "raw") => {
    setTab(newTab);
    setCurrentPage(1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setCurrentPage(1);
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
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
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
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-muted-foreground border border-input rounded-lg bg-background hover:bg-accent transition-colors">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filter
          </button>
        </div>
        <button
          onClick={() => setAdjustOpen(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-all"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Adjust Stock
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                SKU
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Item Name
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Category
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">
                Current Stock
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Unit
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedItems.length === 0 ? (
                <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                        No items found.
                    </td>
                </tr>
            ) : (
                paginatedItems.map((item) => (
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
                    {item.current_stock.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                    {item.unit}
                    </td>
                    <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-border flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length)} of {filteredItems.length} items
        </p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border border-input rounded text-sm text-muted-foreground disabled:opacity-50 hover:bg-accent hover:text-accent-foreground transition-colors disabled:hover:bg-transparent"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            Previous
          </button>
          <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm font-bold">
            {currentPage}
          </button>
          <button 
            className="px-3 py-1 border border-input rounded text-sm text-muted-foreground disabled:opacity-50 hover:bg-accent hover:text-accent-foreground transition-colors disabled:hover:bg-transparent"
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>

      <AdjustStockDialog
        open={adjustOpen}
        onOpenChange={setAdjustOpen}
        itemType={tab === "finished" ? "finished_good" : "raw_material"}
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
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
            Out of Stock
        </span>
    )
}
