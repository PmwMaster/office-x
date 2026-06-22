import { useState, useEffect } from 'react';
import { fetchServices } from '../services';
import { isSupabaseConfigured } from '../lib';
import type { ServiceItem } from '../types';

export function useServices() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const onReady = () => {
      setLoading(true);
      fetchServices().then((data) => { setServices(data); setLoading(false); });
    };
    window.addEventListener('supabase-ready', onReady);
    onReady();
    return () => window.removeEventListener('supabase-ready', onReady);
  }, []);

  return { services, loading };
}
