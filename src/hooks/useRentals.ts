import { useState, useEffect } from 'react';
import { fetchRentals } from '../services';
import { isSupabaseConfigured } from '../lib';
import type { RentalItem } from '../types';

export function useRentals() {
  const [rentals, setRentals] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const onReady = () => {
      setLoading(true);
      fetchRentals().then((data) => { setRentals(data); setLoading(false); });
    };
    window.addEventListener('supabase-ready', onReady);
    onReady();
    return () => window.removeEventListener('supabase-ready', onReady);
  }, []);

  return { rentals, loading };
}
