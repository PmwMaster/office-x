import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { RentalItem } from '../types';
import { RENTALS as MOCK_RENTALS } from '../mock/data';

export async function fetchRentals(): Promise<RentalItem[]> {
  if (!isSupabaseConfigured() || !supabase) return MOCK_RENTALS;

  const { data, error } = await supabase
    .from('rentals')
    .select('*')
    .order('price_per_day');

  if (error || !data) return MOCK_RENTALS;

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    pricePerDay: Number(row.price_per_day),
    status: row.status as RentalItem['status'],
    specs: row.specs,
    image: row.image,
    imageAlt: row.image_alt,
    category: row.category as RentalItem['category'],
    type: 'rental' as const,
  }));
}
