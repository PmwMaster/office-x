import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';
import type { ServiceItem } from '../types';
import { SERVICES as MOCK_SERVICES } from '../mock/data';

export function useServices() {
  const [services, setServices] = useState<ServiceItem[]>(MOCK_SERVICES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    if (!isSupabaseReady()) {
      setServices(MOCK_SERVICES);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase!
      .from('services')
      .select('*')
      .order('category');

    if (error) {
      setError(error.message);
    } else if (data) {
      setServices(
        data.map((row) => ({
          id: row.id,
          name: row.name,
          price: Number(row.price),
          peripheral_brand: row.peripheral_brand,
          peripheral_model: row.peripheral_model,
          type: 'service' as const,
          description: row.description,
          category: row.category as ServiceItem['category'],
          details: row.details,
        })),
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, loading, error, refetch: fetchServices };
}
