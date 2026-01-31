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
import { env } from "@/lib/env";

export function createAdminClient() {
  return createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
