"use client";

import { Analytics } from "@vercel/analytics/react";
import { usePathname } from "next/navigation";

export default function PublicAnalytics() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return <Analytics />;
}
