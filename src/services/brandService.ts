import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Brand } from '../types';
import { BRANDS as MOCK_BRANDS } from '../mock/brands';

export async function fetchBrands(): Promise<Brand[]> {
  if (!isSupabaseConfigured() || !supabase) return MOCK_BRANDS;

  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name');

  if (error || !data) return MOCK_BRANDS;

  return data as Brand[];
}
