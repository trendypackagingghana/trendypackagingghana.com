import { Suspense } from "react";
import SignOutButton from "./SignOutButton";
import FAB from "./FAB";
import FinishedGoodsTable from "./FinishedGoodsTable";
import Skeleton from "../components/skeletons/Skeleton";

function TableSkeleton() {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="bg-muted/50 px-4 py-3 border-b border-border flex gap-8">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-20" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="px-4 py-3 border-b border-border flex gap-8">
          {Array.from({ length: 7 }).map((_, j) => (
            <Skeleton key={j} className="h-4 w-20" />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-end p-4">
        <SignOutButton />
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Finished Goods</h1>
        <Suspense fallback={<TableSkeleton />}>
          <FinishedGoodsTable />
        </Suspense>
      </main>
      <FAB />
    </div>
  );
}
