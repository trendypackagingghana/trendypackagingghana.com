import { getLowStockAlerts } from "../production-runs/_lib/data";

export default async function AlertBar() {
  const alerts = await getLowStockAlerts();

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2">
      {alerts.map((message, i) => (
        <div
          key={i}
          className="flex items-center gap-3 sm:gap-4 bg-amber-50 border border-amber-100 p-3 sm:p-4 rounded-xl"
        >
          <span className="material-symbols-outlined text-amber-500 shrink-0">
            warning
          </span>
          <p className="flex-1 text-xs sm:text-sm font-semibold text-amber-800 leading-snug">
            {message}
          </p>
        </div>
      ))}
    </div>
  );
}
