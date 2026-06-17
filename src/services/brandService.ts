import { useState, useEffect } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';
import type { Brand } from '../types';
import { BRANDS as MOCK_BRANDS } from '../mock/brands';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>(MOCK_BRANDS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseReady()) {
      setBrands(MOCK_BRANDS);
      setLoading(false);
      return;
    }

    supabase!
      .from('brands')
      .select('*')
      .order('name')
      .then(({ data, error }) => {
        if (!error && data) {
          setBrands(data as Brand[]);
        }
        setLoading(false);
      });
  }, []);

  return { brands, loading };
}
