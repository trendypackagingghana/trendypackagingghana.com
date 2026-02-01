import { getLowStockAlerts } from "./_features/production-runs/_lib/data";
import DashboardShell from "./_components/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const alerts = await getLowStockAlerts();

  return <DashboardShell alerts={alerts}>{children}</DashboardShell>;
}
