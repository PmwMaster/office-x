import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';
import type { ProductItem } from '../types';
import { PRODUCTS as MOCK_PRODUCTS } from '../mock/data';

export function useProducts() {
  const [products, setProducts] = useState<ProductItem[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!isSupabaseReady()) {
      setProducts(MOCK_PRODUCTS);
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

export function useProduct(id: string | undefined) {
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    if (!isSupabaseReady()) {
      const found = MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
      setProduct(found);
      setLoading(false);
      return;
    }

    supabase!
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (data && !error) {
          setProduct({
            id: data.id,
            name: data.name,
            price: Number(data.price),
            type: 'sale',
            specs: data.specs,
            image: data.image,
            imageAlt: data.image_alt,
            category: data.category as ProductItem['category'],
          });
        }
        setLoading(false);
      });
  }, [id]);

  return { product, loading };
}
