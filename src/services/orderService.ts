import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { ServiceOrder, PurchaseHistory } from '../types';
import { SERVICE_ORDERS as MOCK_ORDERS, PURCHASE_HISTORY as MOCK_HISTORY } from '../mock/data';

export async function fetchServiceOrders(): Promise<ServiceOrder[]> {
  if (!isSupabaseConfigured() || !supabase) return MOCK_ORDERS;

  const { data, error } = await supabase
    .from('service_orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return MOCK_ORDERS;

  return data.map((row) => ({
    id: `#OS-${row.id.slice(0, 4)}`,
    title: row.title,
    description: row.description,
    status: row.status as ServiceOrder['status'],
    priority: row.priority as ServiceOrder['priority'],
    technician: row.technician,
    createdAt: new Date(row.created_at).toLocaleDateString('pt-BR'),
    tracking: row.tracking ?? undefined,
    progress: row.progress ?? undefined,
  }));
}

export async function fetchPurchaseHistory(): Promise<PurchaseHistory[]> {
  if (!isSupabaseConfigured() || !supabase) return MOCK_HISTORY;

  const { data, error } = await supabase
    .from('purchase_history')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return MOCK_HISTORY;

  return data.map((row) => ({
    item: row.item,
    itemSub: row.item_sub,
    id: row.transaction_id,
    date: row.date,
    status: row.status,
    value: Number(row.value),
    icon: row.icon,
    iconColor: row.icon_color,
  }));
}

export async function createServiceOrder(order: Omit<ServiceOrder, 'id' | 'createdAt'>) {
  if (!isSupabaseConfigured() || !supabase) return null;
  const { data, error } = await supabase
    .from('service_orders')
    .insert({
      title: order.title,
      description: order.description,
      status: order.status,
      priority: order.priority,
      technician: order.technician,
      progress: order.progress ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateServiceOrderStatus(id: string, status: ServiceOrder['status']) {
  if (!isSupabaseConfigured() || !supabase) return null;
  const { data, error } = await supabase
    .from('service_orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
