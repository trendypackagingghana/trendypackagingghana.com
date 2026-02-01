import { Suspense } from "react";
import StockChart from "./_features/insights/stock-chart";
import StaffOverview from "./_features/insights/staff-overview";
import ProductionComparison from "./_features/insights/production-comparison";

export default async function DashboardPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 md:py-8 space-y-6 md:space-y-8 max-w-7xl">
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <Suspense
            fallback={
              <div className="bg-card rounded-xl border border-border shadow-sm p-6 min-h-[320px] animate-pulse" />
            }
          >
            <ProductionComparison />
          </Suspense>
        </div>
        <StaffOverview />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <StockChart />
        </div>
      </section>
    </div>
  );
}
