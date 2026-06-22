import { useState, useEffect } from 'react';
import { fetchServiceOrders, fetchPurchaseHistory } from '../services';
import { isSupabaseConfigured } from '../lib';
import type { ServiceOrder, PurchaseHistory } from '../types';

export function useServiceOrders() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const onReady = () => {
      setLoading(true);
      fetchServiceOrders().then((data) => { setOrders(data); setLoading(false); });
    };
    window.addEventListener('supabase-ready', onReady);
    onReady();
    return () => window.removeEventListener('supabase-ready', onReady);
  }, []);

  return { orders, loading };
}

export function usePurchaseHistory() {
  const [history, setHistory] = useState<PurchaseHistory[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured());

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const onReady = () => {
      setLoading(true);
      fetchPurchaseHistory().then((data) => { setHistory(data); setLoading(false); });
    };
    window.addEventListener('supabase-ready', onReady);
    onReady();
    return () => window.removeEventListener('supabase-ready', onReady);
  }, []);

  return { history, loading };
}
