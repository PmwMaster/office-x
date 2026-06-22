import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { ServiceItem } from '../types';
import { SERVICES as MOCK_SERVICES } from '../mock/data';

export async function fetchServices(): Promise<ServiceItem[]> {
  if (!isSupabaseConfigured() || !supabase) return MOCK_SERVICES;

  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('category');

  if (error || !data) return MOCK_SERVICES;

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    price: Number(row.price),
    peripheral_brand: row.peripheral_brand,
    peripheral_model: row.peripheral_model,
    type: 'service' as const,
    description: row.description,
    category: row.category as ServiceItem['category'],
    details: row.details,
  }));
}
