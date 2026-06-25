-- =====================================================
-- Fix purchase_history RLS to scope by user
-- =====================================================

-- Add user_id column to purchase_history
ALTER TABLE purchase_history
  ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_purchase_history_user_id ON purchase_history(user_id);

-- Drop old permissive policy
DROP POLICY IF EXISTS "Usuário vê seu histórico" ON purchase_history;

-- Create new policy scoped to the authenticated user
CREATE POLICY "Usuário vê seu histórico" ON purchase_history
  FOR SELECT USING (auth.uid() = user_id);

-- Allow authenticated users to insert their own purchase history
CREATE POLICY "Usuário insere seu histórico" ON purchase_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
