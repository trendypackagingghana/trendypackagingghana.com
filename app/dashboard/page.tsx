import { Suspense } from "react";
import SignOutButton from "./SignOutButton";
import FAB from "./FAB";
import ProductionRunsList from "./ProductionRunsList";
import StatusFilter from "./StatusFilter";
import Skeleton from "../components/skeletons/Skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function CardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  return (
    <div className="min-h-screen bg-background">
      <header className="flex justify-end p-4">
        <SignOutButton />
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Production Runs
          </h1>
          <StatusFilter />
        </div>
        <Suspense key={status ?? "all"} fallback={<CardsSkeleton />}>
          <ProductionRunsList status={status} />
        </Suspense>
      </main>
      <FAB />
    </div>
  );
}
