-- =====================================================
-- OFFICE-X Database Schema
-- Execute este SQL no SQL Editor do Supabase
-- =====================================================

-- 1. Products (Peças + Equipamentos)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  specs TEXT NOT NULL,
  image TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'switches', 'keycaps', 'lubricants', 'plates',
    'stabilizers', 'cables', 'keyboards', 'mice',
    'monitors', 'audio'
  )),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Services (Manutenção, Customização, Montagem)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  peripheral_brand TEXT NOT NULL DEFAULT 'Custom',
  peripheral_model TEXT NOT NULL DEFAULT 'Todos os modelos',
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'maintenance', 'customization', 'assembly'
  )),
  details TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Service Orders (Kanban)
CREATE TABLE IF NOT EXISTS service_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'triage' CHECK (status IN (
    'triage', 'waiting_parts', 'modding_bench', 'done'
  )),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN (
    'normal', 'urgent', 'warranty'
  )),
  technician TEXT NOT NULL DEFAULT '',
  tracking TEXT,
  progress INTEGER CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Purchase History
CREATE TABLE IF NOT EXISTS purchase_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item TEXT NOT NULL,
  item_sub TEXT NOT NULL DEFAULT '',
  transaction_id TEXT NOT NULL UNIQUE,
  date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ENTREGUE',
  value NUMERIC(10,2) NOT NULL DEFAULT 0,
  icon TEXT NOT NULL DEFAULT 'keyboard',
  icon_color TEXT NOT NULL DEFAULT 'text-primary-fixed',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Orders (Checkout)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'
  )),
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  items JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==================== INDEXES ====================

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_service_orders_status ON service_orders(status);
CREATE INDEX IF NOT EXISTS idx_service_orders_priority ON service_orders(priority);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);

-- ==================== ROW LEVEL SECURITY ====================

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public read access for products and services
CREATE POLICY "Produtos visíveis publicamente" ON products
  FOR SELECT USING (true);

CREATE POLICY "Serviços visíveis publicamente" ON services
  FOR SELECT USING (true);

-- Admin policies for service_orders
CREATE POLICY "Admin pode ver O.S." ON service_orders
  FOR SELECT USING (true);
CREATE POLICY "Admin pode criar O.S." ON service_orders
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin pode atualizar O.S." ON service_orders
  FOR UPDATE USING (true);

-- Purchase history: authenticated users see their own
CREATE POLICY "Usuário vê seu histórico" ON purchase_history
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Orders: authenticated users create and see their own
CREATE POLICY "Usuário vê seus pedidos" ON orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuário cria pedidos" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ==================== TRIGGER: updated_at ====================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER service_orders_updated_at
  BEFORE UPDATE ON service_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
