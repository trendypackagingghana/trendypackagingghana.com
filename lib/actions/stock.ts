"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const manualAdjustmentSchema = z.object({
  item_type: z.enum(["finished_good", "raw_material"]),
  item_sku: z.string().min(1, "SKU is required"),
  direction: z.enum(["in", "out"]),
  quantity: z.number().positive("Quantity must be greater than 0"),
  note: z.string().optional(),
});

export async function manualStockAdjustment(input: {
  item_type: "finished_good" | "raw_material";
  item_sku: string;
  direction: "in" | "out";
  quantity: number;
  note?: string;
}) {
  const validated = manualAdjustmentSchema.parse(input);

  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Unauthorized" };
  }

  const reason = validated.note
    ? `manual_adjustment: ${validated.note}`
    : "manual_adjustment";

  const movementData: Record<string, unknown> = {
    item_type: validated.item_type,
    item_sku: validated.item_sku,
    direction: validated.direction,
    reason,
    created_by: user.id,
  };

  if (validated.item_type === "finished_good") {
    movementData.quantity_pieces = validated.quantity;
  } else {
    movementData.quantity_kg = validated.quantity;
  }

  const { error: insertError } = await supabase
    .from("stock_movements")
    .insert(movementData);

  if (insertError) {
    console.error("Stock movement insert error:", insertError);
    return { error: "Failed to record stock adjustment" };
  }

  // Update the actual stock table
  if (validated.item_type === "finished_good") {
    const { data: current } = await supabase
      .from("finished_goods_stock")
      .select("quantity_pieces")
      .eq("sku", validated.item_sku)
      .single();

    if (current) {
      const newQty =
        validated.direction === "in"
          ? current.quantity_pieces + validated.quantity
          : Math.max(0, current.quantity_pieces - validated.quantity);

      await supabase
        .from("finished_goods_stock")
        .update({ quantity_pieces: newQty })
        .eq("sku", validated.item_sku);
    }
  } else {
    const { data: current } = await supabase
      .from("raw_material_stock")
      .select("quantity_bags")
      .eq("material_sku", validated.item_sku)
      .single();

    if (current) {
      const newQty =
        validated.direction === "in"
          ? current.quantity_bags + validated.quantity
          : Math.max(0, current.quantity_bags - validated.quantity);

      await supabase
        .from("raw_material_stock")
        .update({ quantity_bags: newQty })
        .eq("material_sku", validated.item_sku);
    }
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/inventory");

  return { success: true };
}
