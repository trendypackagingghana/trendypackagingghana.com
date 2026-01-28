/**
 * Supabase Admin Client - Server Only
 *
 * Creates a Supabase client with admin privileges using the service role key.
 * This client BYPASSES Row Level Security (RLS).
 *
 * SECURITY WARNING:
 * - Only use this for server-side operations that require elevated privileges
 * - Never expose the service role key to the client
 * - Use sparingly and with explicit intent
 *
 * Common use cases:
 * - Creating user profiles after signup (before RLS policies apply)
 * - Admin operations that need to bypass RLS
 * - Background jobs and webhooks
 */

import "server-only";

import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
