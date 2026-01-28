/**
 * Authentication Utilities - Server Only
 *
 * Provides utilities for verifying authentication and
 * passing user context to database operations.
 */

import "server-only";

import { createClient } from "@/lib/supabase/server";
import { getProfileById } from "@/lib/db/queries/profiles";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@prisma/client";

export type AuthenticatedUser = {
  supabaseUser: User;
  profile: Profile | null;
};

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
 * Get the authenticated user with their profile.
 * Returns null if not authenticated.
 */
export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const profile = await getProfileById(user.id);

  return {
    supabaseUser: user,
    profile,
  };
}

/**
 * Require authentication.
 * Throws an error if the user is not authenticated.
 * Use this in API routes and server actions.
 */
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    throw new AuthenticationError("Authentication required");
  }

  return user;
}

/**
 * Require authentication with profile.
 * Throws an error if the user is not authenticated or has no profile.
 */
export async function requireAuthWithProfile(): Promise<AuthenticatedUser> {
  const authUser = await getAuthenticatedUser();

  if (!authUser) {
    throw new AuthenticationError("Authentication required");
  }

  if (!authUser.profile) {
    throw new AuthenticationError("User profile not found");
  }

  return authUser;
}

/**
 * Require a specific role.
 * Throws an error if the user doesn't have the required role.
 */
export async function requireRole(
  requiredRole: "USER" | "MODERATOR" | "ADMIN"
): Promise<AuthenticatedUser> {
  const authUser = await requireAuthWithProfile();

  const roleHierarchy = {
    USER: 0,
    MODERATOR: 1,
    ADMIN: 2,
  };

  if (roleHierarchy[authUser.profile!.role] < roleHierarchy[requiredRole]) {
    throw new AuthorizationError(
      `Required role: ${requiredRole}, current role: ${authUser.profile!.role}`
    );
  }

  return authUser;
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
