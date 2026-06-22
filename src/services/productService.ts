import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { ProductItem } from '../types';
import { ICECAT_PRODUCTS } from '../data/icecat-catalog';

const MOCK_PRODUCTS = ICECAT_PRODUCTS as ProductItem[];

export async function fetchProducts(): Promise<ProductItem[]> {
  if (!isSupabaseConfigured() || !supabase) return MOCK_PRODUCTS;

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('category');

  if (error || !data) return MOCK_PRODUCTS;

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    price: Number(row.price),
    type: 'sale' as const,
    specs: row.specs,
    image: row.image,
    imageAlt: row.image_alt,
    category: row.category as ProductItem['category'],
  }));
}

export async function fetchProductById(id: string): Promise<ProductItem | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;

  return {
    id: data.id,
    name: data.name,
    price: Number(data.price),
    type: 'sale' as const,
    specs: data.specs,
    image: data.image,
    imageAlt: data.image_alt,
    category: data.category as ProductItem['category'],
  };
}
