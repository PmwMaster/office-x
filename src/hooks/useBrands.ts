import { useState, useEffect } from 'react';
import { fetchBrands } from '../services';
import { isSupabaseConfigured } from '../lib';
import type { Brand } from '../types';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const onReady = () => {
      setLoading(true);
      fetchBrands().then((data) => { setBrands(data); setLoading(false); });
    };
    window.addEventListener('supabase-ready', onReady);
    onReady();
    return () => window.removeEventListener('supabase-ready', onReady);
  }, []);

  return { brands, loading };
}
