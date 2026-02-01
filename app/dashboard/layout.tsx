import { getLowStockAlerts } from "./_features/production-runs/_lib/data";
import { getUserProfile } from "@/lib/auth";
import type { UserRole } from "@/lib/auth";
import DashboardShell from "./_components/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alerts, profile] = await Promise.all([
    getLowStockAlerts(),
    getUserProfile(),
  ]);

  const role: UserRole = profile?.role ?? "shift_leader";

  return (
    <DashboardShell alerts={alerts} role={role}>
      {children}
    </DashboardShell>
  );
}
