import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';
import type { ProductItem } from '../types';
import { PRODUCTS as MOCK_PRODUCTS } from '../mock/data';
import { ICECAT_PRODUCTS } from '../data/icecat-catalog';

const ALL_PRODUCTS = [...ICECAT_PRODUCTS, ...MOCK_PRODUCTS] as ProductItem[];

export function useProducts() {
  const [products, setProducts] = useState<ProductItem[]>(ALL_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!isSupabaseReady()) {
      setProducts(ALL_PRODUCTS);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase!
      .from('products')
      .select('*')
      .order('category');

    if (error) {
      setError(error.message);
    } else if (data) {
      setProducts(
        data.map((row) => ({
          id: row.id,
          name: row.name,
          price: Number(row.price),
          type: 'sale' as const,
          specs: row.specs,
          image: row.image,
          imageAlt: row.image_alt,
          category: row.category as ProductItem['category'],
        })),
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}
