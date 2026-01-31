import { createClient } from "@/lib/supabase/server";

const LOW_STOCK_THRESHOLD = 11;

export default async function AlertBar() {
  const supabase = await createClient();

  const alerts: string[] = [];

  // Check raw material stock
  const { data: rawMaterials } = await supabase
    .from("raw_material_stock")
    .select("material_sku, quantity_bags")
    .lt("quantity_bags", LOW_STOCK_THRESHOLD);

  if (rawMaterials && rawMaterials.length > 0) {
    for (const item of rawMaterials) {
      alerts.push(
        `Raw material "${item.material_sku}" is low — ${item.quantity_bags} bags remaining`
      );
    }
  }

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
