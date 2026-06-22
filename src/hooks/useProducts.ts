import { useState, useEffect } from 'react';
import { fetchProducts, fetchProductById } from '../services';
import { isSupabaseConfigured } from '../lib';
import type { ProductItem } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const onReady = () => {
      setLoading(true);
      fetchProducts().then((data) => { setProducts(data); setLoading(false); }).catch((e) => { setError(e.message); setLoading(false); });
    };
    window.addEventListener('supabase-ready', onReady);
    onReady();
    return () => window.removeEventListener('supabase-ready', onReady);
  }, []);

  return { products, loading, error };
}

export function useProductDetail(id: string) {
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductById(id).then((p) => { setProduct(p); setLoading(false); });
  }, [id]);

  return { product, loading };
}
