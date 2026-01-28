/**
 * Supabase Browser Client
 *
 * Creates a Supabase client for use in Client Components.
 * This client is used for client-side auth operations only.
 *
 * IMPORTANT: This client should NEVER be used to access Prisma
 * or perform direct database operations.
 */

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
