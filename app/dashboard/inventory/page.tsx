import { Suspense } from "react";
import { company } from "@/app/config/company";
import {
  getFinishedGoodsInventory,
  getRawMaterialsInventory,
  getStockMovements,
} from "./_lib/data";
import { InventoryTable } from "./_components/inventory-table";
import { StockLedger } from "./_components/stock-ledger";

export const metadata = {
  title: `Inventory | ${company.legalName}`,
};

export default async function InventoryPage() {
  const [finishedGoods, rawMaterials, movements] = await Promise.all([
    getFinishedGoodsInventory(),
    getRawMaterialsInventory(),
    getStockMovements(),
  ]);

  return (
    <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Inventory Section (Left 8 cols) */}
        <div className="lg:col-span-8">
          <Suspense fallback={<div>Loading inventory...</div>}>
            <InventoryTable 
                finishedGoods={finishedGoods} 
                rawMaterials={rawMaterials} 
            />
          </Suspense>
        </div>

        {/* Stock Ledger (Right 4 cols) */}
        <div className="lg:col-span-4">
          <Suspense fallback={<div>Loading ledger...</div>}>
            <StockLedger movements={movements} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
