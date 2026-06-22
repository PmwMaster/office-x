-- =====================================================
-- OFFICE-X - Rentals & Brands Tables
-- Execute após 001_schema.sql e 002_product_images_bucket.sql
-- =====================================================

-- 1. Rentals (Locação de Equipamentos)
CREATE TABLE IF NOT EXISTS rentals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price_per_day NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'in_use')),
  specs TEXT NOT NULL,
  image TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('keyboards', 'mice', 'monitors', 'audio')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Brands (Marcas Parceiras)
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  website TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ==================== INDEXES ====================

CREATE INDEX IF NOT EXISTS idx_rentals_category ON rentals(category);
CREATE INDEX IF NOT EXISTS idx_rentals_status ON rentals(status);
CREATE INDEX IF NOT EXISTS idx_brands_category ON brands(category);
CREATE INDEX IF NOT EXISTS idx_brands_featured ON brands(featured);

-- ==================== ROW LEVEL SECURITY ====================

ALTER TABLE rentals ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Public read access for rentals and brands
CREATE POLICY "Equipamentos visíveis publicamente" ON rentals
  FOR SELECT USING (true);

CREATE POLICY "Marcas visíveis publicamente" ON brands
  FOR SELECT USING (true);

-- ==================== SEED DATA ====================

INSERT INTO rentals (name, price_per_day, status, specs, image, image_alt, category) VALUES
('Wooting 80HE', 79.00, 'available', 'RAPID TRIGGER 0.1MM - MAGNÉTICO - 8KHZ - 80%', '/images/products/wooting-80he.svg', 'Wooting 80HE mechanical keyboard.', 'keyboards'),
('Asus ROG Azoth Extreme', 89.00, 'available', 'GASKET-MOUNT - OLED 2'' - HOT-SWAP - 75%', '/images/products/asus-azoth-extreme.jpg', 'Asus ROG Azoth Extreme wireless keyboard.', 'keyboards'),
('Logitech G Pro X Superlight 2 Dex', 32.00, 'available', 'HERO 2 - 44K DPI - 60G - 8KHZ - LIGHTSPEED', '/images/products/logitech-gpx2-dex.svg', 'Logitech G Pro X Superlight 2 Dex.', 'mice'),
('Razer Viper V3 Pro', 39.00, 'in_use', 'FOCUS PRO 35K - 54G - 8KHZ HYPERPOLLING', '/images/products/razer-viper-v3-pro.webp', 'Razer Viper V3 Pro.', 'mice'),
('Pulsar X3', 36.00, 'available', 'XS-1 32K - 55G - 4KHZ WIRELESS - ERGO', '/images/products/pulsar-x3.svg', 'Pulsar X3 ergonomic mouse.', 'mice'),
('ASUS ROG Swift OLED PG32UCDM', 290.00, 'available', '32'' 4K 240HZ QD-OLED - 0.03MS - G-SYNC', '/images/products/asus-pg32ucdm.jpg', 'ASUS ROG Swift OLED PG32UCDM monitor.', 'monitors'),
('Samsung Odyssey OLED G8 34"', 210.00, 'available', '34'' UWQHD 175HZ QD-OLED - 99.3% DCI-P3', '/images/products/samsung-odyssey-g8-oled.svg', 'Samsung Odyssey OLED G8.', 'monitors'),
('BenQ PD3225U', 185.00, 'available', '32'' 4K IPS BLACK - 98% DCI-P3 - TB3', '/images/products/benq-pd3225u.jpg', 'BenQ PD3225U professional monitor.', 'monitors'),
('Shure SM7B', 89.00, 'available', 'DINÂMICO CARDIOIDE - PADRÃO BROADCAST - XLR', '/images/products/shure-sm7b.jpg', 'Shure SM7B microphone.', 'audio'),
('Beyerdynamic DT 900 Pro X', 69.00, 'available', 'ABERTO 48Ω - STELLAR.45 DRIVER - 5-40KHZ', '/images/products/beyerdynamic-dt900px.png', 'Beyerdynamic DT 900 Pro X.', 'audio');
