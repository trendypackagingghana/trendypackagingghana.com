"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const STATUSES = ["All", "Active", "Completed"] as const;

export default function StatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("status") || "All";

  function handleFilter(status: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (status === "All") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    router.push(`/dashboard?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {STATUSES.map((status) => {
        const isActive = status === current;
        return (
          <Button
            key={status}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilter(status)}
          >
            {status}
          </Button>
        );
      })}
    </div>
  );
}
