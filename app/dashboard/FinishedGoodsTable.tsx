import { createClient } from "@/lib/supabase/server";

export default async function FinishedGoodsTable() {
  const supabase = await createClient();

  const { data: goods, error } = await supabase
    .from("finished-goods")
    .select("*")
    .order("category", { ascending: true })
    .order("size", { ascending: true });

  if (error) {
    console.error("Finished goods error:", error);
    return (
      <div className="text-center py-12 text-red-500">
        Failed to load finished goods: {error.message}
      </div>
    );
  }

  if (!goods || goods.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No finished goods found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            <th className="text-left px-4 py-3 font-semibold text-foreground">SKU</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Category</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Company</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Size</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Color</th>
            <th className="text-right px-4 py-3 font-semibold text-foreground">Pcs/Bag</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Material Type</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">Weight</th>
            <th className="text-left px-4 py-3 font-semibold text-foreground">MB %</th>
          </tr>
        </thead>
        <tbody>
          {goods.map((item: Record<string, unknown>, index: number) => (
            <tr
              key={(item.id as string) ?? index}
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-3 font-mono text-xs text-foreground">{item.sku as string}</td>
              <td className="px-4 py-3 text-foreground">{item.category as string}</td>
              <td className="px-4 py-3 text-foreground">{item.company as string}</td>
              <td className="px-4 py-3 text-foreground">{(item.size as string) || "—"}</td>
              <td className="px-4 py-3 text-foreground">{item.color as string}</td>
              <td className="px-4 py-3 text-right text-foreground">{item.pieces_per_bag as number}</td>
              <td className="px-4 py-3 text-foreground">{item.material_type as string}</td>
              <td className="px-4 py-3 text-foreground">{(item.weight as string) || "—"}</td>
              <td className="px-4 py-3 text-foreground">{(item.masterbatch_percentage as string) || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
