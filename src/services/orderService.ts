import { useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseReady } from '../lib/supabase';
import type { ServiceOrder, PurchaseHistory } from '../types';
import { SERVICE_ORDERS as MOCK_ORDERS, PURCHASE_HISTORY as MOCK_HISTORY } from '../mock/data';

/* ==================== SERVICE ORDERS ==================== */

export function useServiceOrders() {
  const [orders, setOrders] = useState<ServiceOrder[]>(MOCK_ORDERS);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    if (!isSupabaseReady()) {
      setOrders(MOCK_ORDERS);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase!
      .from('service_orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setOrders(
        data.map((row) => ({
          id: `#OS-${row.id.slice(0, 4)}`,
          title: row.title,
          description: row.description,
          status: row.status as ServiceOrder['status'],
          priority: row.priority as ServiceOrder['priority'],
          technician: row.technician,
          createdAt: new Date(row.created_at).toLocaleDateString('pt-BR'),
          tracking: row.tracking ?? undefined,
          progress: row.progress ?? undefined,
        })),
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, loading, refetch: fetchOrders };
}

export async function createServiceOrder(
  order: Omit<ServiceOrder, 'id' | 'createdAt'>,
) {
  if (!isSupabaseReady()) return null;

  const { data, error } = await supabase!
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

export async function updateServiceOrderStatus(
  id: string,
  status: ServiceOrder['status'],
) {
  if (!isSupabaseReady()) return null;

  const { data, error } = await supabase!
    .from('service_orders')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/* ==================== PURCHASE HISTORY ==================== */

export function usePurchaseHistory() {
  const [history, setHistory] = useState<PurchaseHistory[]>(MOCK_HISTORY);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    if (!isSupabaseReady()) {
      setHistory(MOCK_HISTORY);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase!
      .from('purchase_history')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setHistory(
        data.map((row) => ({
          item: row.item,
          itemSub: row.item_sub,
          id: row.transaction_id,
          date: row.date,
          status: row.status,
          value: Number(row.value),
          icon: row.icon,
          iconColor: row.icon_color,
        })),
      );
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { history, loading, refetch: fetchHistory };
}
