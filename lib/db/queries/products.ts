/**
 * Product Database Queries - Server Only
 *
 * Product-related database operations.
 * Public products can be read without auth.
 * Mutations require admin authentication.
 */

import "server-only";

import { prisma } from "@/lib/db";
import type { Product } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

export type CreateProductInput = {
  name: string;
  slug: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isActive?: boolean;
};

export type UpdateProductInput = Partial<CreateProductInput>;

export type ProductListOptions = {
  page?: number;
  limit?: number;
  activeOnly?: boolean;
};

/**
 * Get all products with pagination.
 * By default returns only active products.
 */
export async function getProducts(
  options: ProductListOptions = {}
): Promise<{ products: Product[]; total: number }> {
  const { page = 1, limit = 20, activeOnly = true } = options;
  const skip = (page - 1) * limit;

  const where = activeOnly ? { isActive: true } : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total };
}

/**
 * Get a product by slug.
 */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { slug },
  });
}

/**
 * Get a product by ID.
 */
export async function getProductById(
  id: string
): Promise<Product | null> {
  return prisma.product.findUnique({
    where: { id },
  });
}

/**
 * Create a new product.
 * Requires admin authentication (checked at route level).
 */
export async function createProduct(
  input: CreateProductInput
): Promise<Product> {
  return prisma.product.create({
    data: {
      ...input,
      price: input.price,
    },
  });
}

/**
 * Update a product.
 * Requires admin authentication (checked at route level).
 */
export async function updateProduct(
  id: string,
  input: UpdateProductInput
): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data: input,
  });
}

/**
 * Soft-delete a product by marking it inactive.
 * Preserves order history integrity.
 */
export async function deactivateProduct(id: string): Promise<Product> {
  return prisma.product.update({
    where: { id },
    data: { isActive: false },
  });
}

/**
 * Hard-delete a product.
 * Will fail if product has existing orders (FK constraint).
 */
export async function deleteProduct(id: string): Promise<Product> {
  return prisma.product.delete({
    where: { id },
  });
}
