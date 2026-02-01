/**
 * Authentication Utilities - Server Only
 *
 * Provides utilities for verifying authentication
 * using Supabase Auth.
 */

import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export type UserRole = "admin" | "shift_leader";

export interface UserProfile {
  id: string;
  role: UserRole;
  full_name: string | null;
}

/**
 * Get the currently authenticated user from the session.
 * Returns null if not authenticated.
 */
export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

/**
 * Require authentication.
 * Throws an error if the user is not authenticated.
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    throw new AuthenticationError("Authentication required");
  }

  return user;
}

/**
 * Custom error for authentication failures.
 */
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthenticationError";
  }
}

/**
 * Custom error for authorization failures.
 */
export class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

/**
 * Fetch the profile (including role) for the currently authenticated user.
 * Returns null if not authenticated or no profile row exists.
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, role, full_name")
    .eq("id", user.id)
    .single();

  if (error || !data) return null;

  return data as UserProfile;
}

/**
 * Require that the current user has one of the allowed roles.
 * Throws AuthenticationError if not logged in, AuthorizationError if role doesn't match.
 */
export async function requireRole(
  ...allowedRoles: UserRole[]
): Promise<UserProfile> {
  const profile = await getUserProfile();

  if (!profile) {
    throw new AuthenticationError("Authentication required");
  }

  if (!allowedRoles.includes(profile.role)) {
    throw new AuthorizationError("You do not have permission to access this resource");
  }

  return profile;
}
