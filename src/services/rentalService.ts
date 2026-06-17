import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';
import type { RentalItem } from '../types';
import { RENTALS as MOCK_RENTALS } from '../mock/data';

export function useRentals() {
  const [rentals, setRentals] = useState<RentalItem[]>(MOCK_RENTALS);
  const [loading, setLoading] = useState(true);

  const fetchRentals = useCallback(async () => {
    if (!isSupabaseReady()) {
      setRentals(MOCK_RENTALS);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase!
      .from('rentals')
      .select('*')
      .order('price_per_day');

    if (!error && data) {
      setRentals(
        data.map((row) => ({
          id: row.id,
          name: row.name,
          pricePerDay: Number(row.price_per_day),
          status: row.status as RentalItem['status'],
          specs: row.specs,
          image: row.image,
          imageAlt: row.image_alt,
          category: row.category as RentalItem['category'],
          type: 'rental' as const,
        })),
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  return { rentals, loading, refetch: fetchRentals };
}
