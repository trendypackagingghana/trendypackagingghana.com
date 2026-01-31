import { createClient } from "@/lib/supabase/server";
import {
    InventoryItem,
    InventoryStats,
    StockMovement,
} from "@/types/inventory";

export async function getInventoryStats(): Promise<InventoryStats> {
    // In a real app, you might want a dedicated RPC function or materialized view for this
    // to avoid fetching all rows. For now, we'll return placeholder/calculated values.

    // Placeholder implementation - replacing with real queries would be the next step
    // once we verify the schema is live.
    return {
        total_value: 0, // Pending pricing implementation
        low_stock_count: 0,
        finished_goods_count: 0,
        raw_materials_mass: 0,
    };
}

export async function getFinishedGoodsInventory(): Promise<InventoryItem[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("finished_goods")
        .select(`
      sku,
      category,
      color,
      size,
      finished_goods_stock (
        quantity_pieces
      )
    `);

    if (error) {
        console.error("Error fetching finished goods inventory:", error);
        return [];
    }

    return (data || []).map((item: any) => {
        const qty = item.finished_goods_stock?.quantity_pieces || 0;

        // Determine status logic (this could be more complex based on reorder points)
        let status: InventoryItem["status"] = "In Stock";
        if (qty === 0) status = "Out of Stock";
        else if (qty < 1000) status = "Low Stock"; // Example threshold

        // Construct a name from properties
        const name = [item.size, item.color, item.category].filter(Boolean).join(" ");

        return {
            sku: item.sku,
            name: name,
            category: item.category,
            current_stock: qty,
            unit: "pcs",
            status: status,
            stock_id: item.sku, // using sku as stock_id since 1:1
        };
    });
}

export async function getRawMaterialsInventory(): Promise<InventoryItem[]> {
    const supabase = await createClient();

    // Assuming 'production_materials' exists as per requirements
    const { data, error } = await supabase
        .from("production_materials") // You might need to verify this table name exists
        .select(`
      sku,
      name,
      category,
      raw_material_stock (
        quantity_kg
      )
    `);

    if (error) {
        // If table doesn't exist yet, return empty to prevent crash
        console.error("Error fetching raw materials:", error);
        return [];
    }

    return (data || []).map((item: any) => {
        const qty = item.raw_material_stock?.quantity_kg || 0;

        let status: InventoryItem["status"] = "In Stock";
        if (qty === 0) status = "Out of Stock";
        else if (qty < 100) status = "Low Stock"; // Example threshold

        return {
            sku: item.sku,
            name: item.name,
            category: item.category || "Raw Material",
            current_stock: qty,
            unit: "kg",
            status: status,
            stock_id: item.sku,
        };
    });
}

export async function getStockMovements(limit = 20): Promise<StockMovement[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("stock_movements")
        .select("id, item_type, item_sku, direction, reason, quantity_pieces, quantity_kg, reference_id, created_at, created_by")
        .order("created_at", { ascending: false })
        .limit(limit);

    if (error) {
        console.error("Error fetching movements:", error);
        return [];
    }

    return (data || []).map((m: any) => ({
        id: m.id,
        item_type: m.item_type,
        item_sku: m.item_sku,
        direction: m.direction,
        reason: m.reason,
        // Prefer pieces for finished goods, kg for raw materials
        quantity: m.item_type === 'finished_good' ? (m.quantity_pieces || 0) : (m.quantity_kg || 0),
        reference_id: m.reference_id,
        created_at: m.created_at,
        created_by: m.created_by
    }));
}
