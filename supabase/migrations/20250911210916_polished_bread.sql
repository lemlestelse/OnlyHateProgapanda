/*
  # E-commerce Schema for Metal Madness Store

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text, nullable)
      - `image_url` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `category_id` (uuid, foreign key)
      - `image_url` (text)
      - `images` (text array, nullable)
      - `stock_quantity` (integer)
      - `is_active` (boolean)
      - `featured` (boolean)
      - `sku` (text, nullable)
      - `weight` (numeric, nullable)
      - `dimensions` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `status` (enum)
      - `total_amount` (numeric)
      - `shipping_address` (jsonb)
      - `billing_address` (jsonb)
      - `payment_status` (enum)
      - `payment_method` (text, nullable)
      - `notes` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `price` (numeric)
      - `created_at` (timestamp)
    
    - `coupons`
      - `id` (uuid, primary key)
      - `code` (text, unique)
      - `discount_type` (enum)
      - `discount_value` (numeric)
      - `min_order_amount` (numeric, nullable)
      - `max_uses` (integer, nullable)
      - `used_count` (integer)
      - `is_active` (boolean)
      - `expires_at` (timestamp, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `reviews`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `rating` (integer)
      - `comment` (text, nullable)
      - `is_approved` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Add admin policies for management
*/

-- Create custom types
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE discount_type AS ENUM ('percentage', 'fixed');

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  images text[],
  stock_quantity integer DEFAULT 0 CHECK (stock_quantity >= 0),
  is_active boolean DEFAULT true,
  featured boolean DEFAULT false,
  sku text,
  weight numeric(8,2),
  dimensions text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  status order_status DEFAULT 'pending',
  total_amount numeric(10,2) NOT NULL CHECK (total_amount >= 0),
  shipping_address jsonb NOT NULL,
  billing_address jsonb NOT NULL,
  payment_status payment_status DEFAULT 'pending',
  payment_method text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  created_at timestamptz DEFAULT now()
);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  discount_type discount_type NOT NULL,
  discount_value numeric(10,2) NOT NULL CHECK (discount_value >= 0),
  min_order_amount numeric(10,2),
  max_uses integer,
  used_count integer DEFAULT 0 CHECK (used_count >= 0),
  is_active boolean DEFAULT true,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(product_id, user_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved) WHERE is_approved = true;

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Categories policies
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Categories are manageable by authenticated users"
  ON categories FOR ALL
  TO authenticated
  USING (true);

-- Products policies
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Products are manageable by authenticated users"
  ON products FOR ALL
  TO authenticated
  USING (true);

-- Orders policies
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view their own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create order items for their orders"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Coupons policies
CREATE POLICY "Coupons are viewable by authenticated users"
  ON coupons FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Coupons are manageable by authenticated users"
  ON coupons FOR ALL
  TO authenticated
  USING (true);

-- Reviews policies
CREATE POLICY "Approved reviews are viewable by everyone"
  ON reviews FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "All reviews are manageable by authenticated users"
  ON reviews FOR ALL
  TO authenticated
  USING (true);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coupons_updated_at BEFORE UPDATE ON coupons
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
  ('T-Shirts', 'Metal and rock band t-shirts'),
  ('Hoodies', 'Comfortable hoodies with metal designs'),
  ('Accessories', 'Metal accessories like patches, pins, and jewelry'),
  ('Vinyl Records', 'Vinyl records from metal and rock bands'),
  ('CDs', 'Compact discs from various metal genres'),
  ('Posters', 'Band posters and metal artwork');

-- Insert sample products
INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, featured) 
SELECT 
  'Metallica Black Album T-Shirt',
  'Classic black t-shirt featuring the iconic Metallica Black Album cover',
  29.99,
  c.id,
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
  50,
  true
FROM categories c WHERE c.name = 'T-Shirts';

INSERT INTO products (name, description, price, category_id, image_url, stock_quantity, featured)
SELECT 
  'Iron Maiden Hoodie',
  'Comfortable black hoodie with Iron Maiden Eddie design',
  59.99,
  c.id,
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
  30,
  true
FROM categories c WHERE c.name = 'Hoodies';

INSERT INTO products (name, description, price, category_id, image_url, stock_quantity)
SELECT 
  'Metal Patch Set',
  'Collection of 10 metal band patches for jackets and bags',
  19.99,
  c.id,
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
  100
FROM categories c WHERE c.name = 'Accessories';