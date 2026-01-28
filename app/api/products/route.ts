/**
 * Products API Route
 *
 * GET /api/products - List products (public)
 * POST /api/products - Create product (admin only)
 *
 * Demonstrates:
 * - Public read access (no auth required)
 * - Protected write access (admin role required)
 * - Prisma usage only after auth verification
 */

import { NextRequest, NextResponse } from "next/server";
import {
  requireRole,
  AuthenticationError,
  AuthorizationError,
} from "@/lib/auth";
import { getProducts, createProduct } from "@/lib/db/queries/products";
import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/),
  description: z.string().max(2000).optional(),
  price: z.number().positive(),
  imageUrl: z.string().url().optional(),
  isActive: z.boolean().optional(),
});

/**
 * GET /api/products
 * Public endpoint - no authentication required.
 * Returns only active products.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    // No auth required for reading public products
    const { products, total } = await getProducts({
      page,
      limit: Math.min(limit, 100), // Cap at 100
      activeOnly: true,
    });

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get products error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/products
 * Admin-only endpoint - requires ADMIN role.
 */
export async function POST(request: NextRequest) {
  try {
    // Step 1: Verify admin role FIRST
    await requireRole("ADMIN");

    // Step 2: Validate input
    const body = await request.json();
    const validatedData = createProductSchema.parse(body);

    // Step 3: Only now access Prisma
    const product = await createProduct(validatedData);

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    if (error instanceof AuthorizationError) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
