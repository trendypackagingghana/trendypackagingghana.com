/**
 * Database Access Layer - Server Only
 *
 * This module provides the Prisma client instance and ensures
 * database access is restricted to server-side code only.
 *
 * SECURITY: The `server-only` import will cause a build error if
 * this module is ever imported from client-side code.
 */

import "server-only";

import { PrismaClient } from "@prisma/client";

// Prevent multiple Prisma instances in development due to hot reloading
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Re-export types for convenience
export type { PrismaClient } from "@prisma/client";
