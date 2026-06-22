import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  id: string;
  name: string;
  price: number;
  specs: string;
  image: string;
}

interface CartEntry {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartEntry[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product) => set((s) => {
        const found = s.items.find((i) => i.product.id === product.id);
        if (found) return { items: s.items.map((i) => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) };
        return { items: [...s.items, { product, quantity: 1 }] };
      }),

      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.product.id !== id) })),

      increase: (id) => set((s) => ({
        items: s.items.map((i) => i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i),
      })),

      decrease: (id) => set((s) => {
        const found = s.items.find((i) => i.product.id === id);
        if (found && found.quantity <= 1) return { items: s.items.filter((i) => i.product.id !== id) };
        return { items: s.items.map((i) => i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i) };
      }),

      clear: () => set({ items: [] }),

      totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
      totalPrice: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    }),
    { name: 'officex-cart' },
  ),
);
