import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductItem, ServiceItem, InvoiceItem } from '../types';

/* ==================== CART ENTRY ==================== */

interface ProductCartEntry {
  item: ProductItem;
  quantity: number;
}

interface ServiceCartEntry {
  item: ServiceItem;
}

/* ==================== STORE STATE ==================== */

interface CartState {
  products: ProductCartEntry[];
  services: ServiceCartEntry[];

  /* --- Product actions --- */
  addProduct: (product: ProductItem) => void;
  removeProduct: (id: string) => void;
  increaseProductQty: (id: string) => void;
  decreaseProductQty: (id: string) => void;

  /* --- Service actions --- */
  addService: (service: ServiceItem) => void;
  removeService: (id: string) => void;

  /* --- Derived --- */
  clearCart: () => void;
  getProductCount: () => number;
  getServiceCount: () => number;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getInvoiceItems: () => InvoiceItem[];
  getTotal: () => number;
}

/* ==================== STORE ==================== */

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      services: [],

      /* ---------- PRODUCTS ---------- */
      addProduct: (product) => {
        set((state) => {
          const existing = state.products.find((p) => p.item.id === product.id);
          if (existing) {
            return {
              products: state.products.map((p) =>
                p.item.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
              ),
            };
          }
          return { products: [...state.products, { item: product, quantity: 1 }] };
        });
      },

      removeProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.item.id !== id),
        }));
      },

      increaseProductQty: (id) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.item.id === id ? { ...p, quantity: p.quantity + 1 } : p,
          ),
        }));
      },

      decreaseProductQty: (id) => {
        set((state) => {
          const existing = state.products.find((p) => p.item.id === id);
          if (existing && existing.quantity <= 1) {
            return { products: state.products.filter((p) => p.item.id !== id) };
          }
          return {
            products: state.products.map((p) =>
              p.item.id === id ? { ...p, quantity: p.quantity - 1 } : p,
            ),
          };
        });
      },

      /* ---------- SERVICES ---------- */
      addService: (service) => {
        set((state) => {
          const exists = state.services.find((s) => s.item.id === service.id);
          if (exists) return state;
          return {
            services: [...state.services, { item: service }],
          };
        });
      },

      removeService: (id) => {
        set((state) => ({
          services: state.services.filter((s) => s.item.id !== id),
        }));
      },

      /* ---------- DERIVED ---------- */
      clearCart: () => set({ products: [], services: [] }),

      getProductCount: () => get().products.reduce((acc, p) => acc + p.quantity, 0),
      getServiceCount: () => get().services.length,
      getTotalItems: () => get().getProductCount() + get().getServiceCount(),

      getSubtotal: () => {
        const s = get();
        const productTotal = s.products.reduce((acc, p) => acc + p.item.price * p.quantity, 0);
        const serviceTotal = s.services.reduce((acc, srv) => acc + srv.item.price, 0);
        return productTotal + serviceTotal;
      },

      getInvoiceItems: () => {
        const s = get();
        const items: InvoiceItem[] = [];

        if (s.products.length > 0) {
          const desc = s.products.map((p) => `${p.item.name} (${p.quantity}x)`).join(', ');
          items.push({
            label: '+ PRODUTOS/PEÇAS',
            description: desc,
            amount: s.products.reduce((acc, p) => acc + p.item.price * p.quantity, 0),
          });
        }

        if (s.services.length > 0) {
          const desc = s.services.map((srv) => srv.item.name).join(', ');
          items.push({
            label: '+ SERVIÇOS TÉCNICOS',
            description: desc,
            amount: s.services.reduce((acc, srv) => acc + srv.item.price, 0),
          });
        }

        return items;
      },

      getTotal: () => get().getSubtotal(),
    }),
    {
      name: 'office-x-cart',
      partialize: (state) => ({
        products: state.products.map((p) => ({
          item: {
            id: p.item.id,
            name: p.item.name,
            price: p.item.price,
            type: 'sale' as const,
            specs: p.item.specs,
            image: p.item.image,
            imageAlt: p.item.imageAlt,
            category: p.item.category,
          },
          quantity: p.quantity,
        })),
        services: state.services.map((s) => ({
          item: {
            id: s.item.id,
            name: s.item.name,
            price: s.item.price,
            peripheral_brand: s.item.peripheral_brand,
            peripheral_model: s.item.peripheral_model,
            type: 'service' as const,
            description: s.item.description,
            category: s.item.category,
            details: s.item.details,
          },
        })),
      }),
    },
  ),
);
