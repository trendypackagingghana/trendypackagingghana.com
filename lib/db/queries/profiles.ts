/**
 * Profile Database Queries - Server Only
 *
 * All profile-related database operations.
 * These functions assume the caller has already verified authentication.
 */

import "server-only";

import { prisma } from "@/lib/db";
import type { Profile, Role } from "@prisma/client";

export type CreateProfileInput = {
  id: string; // Supabase Auth user ID
  email: string;
  fullName?: string;
  avatarUrl?: string;
};

export type UpdateProfileInput = {
  fullName?: string;
  avatarUrl?: string;
};

/**
 * Create a new profile for a Supabase Auth user.
 * Called after successful signup.
 */
export async function createProfile(
  input: CreateProfileInput
): Promise<Profile> {
  return prisma.profile.create({
    data: {
      id: input.id,
      email: input.email,
      fullName: input.fullName,
      avatarUrl: input.avatarUrl,
    },
  });
}

/**
 * Get a profile by user ID.
 * Returns null if not found.
 */
export async function getProfileById(
  userId: string
): Promise<Profile | null> {
  return prisma.profile.findUnique({
    where: { id: userId },
  });
}

/**
 * Get a profile by email.
 * Returns null if not found.
 */
export async function getProfileByEmail(
  email: string
): Promise<Profile | null> {
  return prisma.profile.findUnique({
    where: { email },
  });
}

/**
 * Update a profile.
 * Only updates fields that are provided.
 */
export async function updateProfile(
  userId: string,
  input: UpdateProfileInput
): Promise<Profile> {
  return prisma.profile.update({
    where: { id: userId },
    data: input,
  });
}

/**
 * Update a user's role.
 * Should only be called by admins.
 */
export async function updateProfileRole(
  userId: string,
  role: Role
): Promise<Profile> {
  return prisma.profile.update({
    where: { id: userId },
    data: { role },
  });
}

/**
 * Delete a profile.
 * This will cascade delete related records (orders, etc.)
 */
export async function deleteProfile(userId: string): Promise<Profile> {
  return prisma.profile.delete({
    where: { id: userId },
  });
}

/**
 * Check if a user has a specific role.
 */
export async function hasRole(
  userId: string,
  requiredRole: Role
): Promise<boolean> {
  const profile = await prisma.profile.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!profile) return false;

  const roleHierarchy: Record<Role, number> = {
    USER: 0,
    MODERATOR: 1,
    ADMIN: 2,
  };

  return roleHierarchy[profile.role] >= roleHierarchy[requiredRole];
}
