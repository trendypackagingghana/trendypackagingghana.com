import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/auth";

export default async function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getUserProfile();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
