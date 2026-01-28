-- =============================================================================
-- ROW LEVEL SECURITY (RLS) SETUP FOR SUPABASE
-- =============================================================================
--
-- IMPORTANT: This file is for reference and manual execution in Supabase SQL Editor.
-- Prisma migrations do NOT handle RLS policies.
--
-- HOW RLS WORKS WITH OUR ARCHITECTURE:
--
-- 1. Supabase Auth (anon key) respects RLS policies
-- 2. Prisma uses DATABASE_URL which connects as postgres user
-- 3. The postgres user BYPASSES RLS by default (superuser)
-- 4. This is intentional - Prisma handles its own auth checks
--
-- WHY THIS IS SECURE:
-- - Prisma client is server-only (enforced by `server-only` import)
-- - All Prisma access goes through our auth layer first
-- - The `requireAuth()` functions verify authentication before any DB access
-- - No client-side code can import Prisma (build would fail)
--
-- WHEN TO USE RLS:
-- - If you use Supabase client directly for data access (not recommended with Prisma)
-- - For Supabase Realtime subscriptions
-- - For Supabase Storage policies
--
-- =============================================================================

-- Enable RLS on tables (Prisma-managed tables)
-- Uncomment and run in Supabase SQL Editor if you need RLS

/*
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can only read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Products: Anyone can read active products
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (is_active = true);

-- Products: Only admins can modify products
-- (Would need a function to check admin role)
CREATE POLICY "Admins can modify products" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'ADMIN'
    )
  );

-- Orders: Users can only view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order Items: Users can view items from their orders
CREATE POLICY "Users can view own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );
*/
