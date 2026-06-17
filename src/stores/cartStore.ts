import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductItem, ServiceItem, RentalItem, InvoiceItem } from '../types';

/* ==================== CART ENTRY ==================== */

interface ProductCartEntry {
  item: ProductItem;
  quantity: number;
}

interface ServiceCartEntry {
  item: ServiceItem;
}

interface RentalCartEntry {
  item: RentalItem;
  pickupDate: string;
  returnDate: string;
}

/* ==================== STORE STATE ==================== */

interface CartState {
  products: ProductCartEntry[];
  services: ServiceCartEntry[];
  rentals: RentalCartEntry[];

  /* --- Product actions --- */
  addProduct: (product: ProductItem) => void;
  removeProduct: (id: string) => void;
  increaseProductQty: (id: string) => void;
  decreaseProductQty: (id: string) => void;

  /* --- Service actions --- */
  addService: (service: ServiceItem) => void;
  removeService: (id: string) => void;

  /* --- Rental actions --- */
  addRental: (rental: RentalItem, pickupDate: string, returnDate: string) => void;
  removeRental: (id: string) => void;

  /* --- Derived --- */
  clearCart: () => void;
  getProductCount: () => number;
  getServiceCount: () => number;
  getRentalCount: () => number;
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
      rentals: [],

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

      /* ---------- RENTALS ---------- */
      addRental: (rental, pickupDate, returnDate) => {
        set((state) => {
          const exists = state.rentals.find((r) => r.item.id === rental.id);
          if (exists) return state;
          return {
            rentals: [...state.rentals, { item: rental, pickupDate, returnDate }],
          };
        });
      },

      removeRental: (id) => {
        set((state) => ({
          rentals: state.rentals.filter((r) => r.item.id !== id),
        }));
      },

      /* ---------- DERIVED ---------- */
      clearCart: () => set({ products: [], services: [], rentals: [] }),

      getProductCount: () => get().products.reduce((acc, p) => acc + p.quantity, 0),
      getServiceCount: () => get().services.length,
      getRentalCount: () => get().rentals.length,
      getTotalItems: () => get().getProductCount() + get().getServiceCount() + get().getRentalCount(),

      getSubtotal: () => {
        const s = get();
        const productTotal = s.products.reduce((acc, p) => acc + p.item.price * p.quantity, 0);
        const serviceTotal = s.services.reduce((acc, srv) => acc + srv.item.price, 0);
        const rentalTotal = s.rentals.reduce((acc, r) => {
          const pickup = new Date(r.pickupDate);
          const ret = new Date(r.returnDate);
          const days = Math.max(1, Math.ceil((ret.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)));
          return acc + r.item.pricePerDay * days;
        }, 0);
        return productTotal + serviceTotal + rentalTotal;
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

        if (s.rentals.length > 0) {
          const desc = s.rentals.map((r) => r.item.name).join(', ');
          const rentalAmount = s.rentals.reduce((acc, r) => {
            const pickup = new Date(r.pickupDate);
            const ret = new Date(r.returnDate);
            const days = Math.max(1, Math.ceil((ret.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)));
            return acc + r.item.pricePerDay * days;
          }, 0);
          items.push({
            label: '+ DIÁRIAS DE LOCAÇÃO',
            description: desc,
            amount: rentalAmount,
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
        rentals: state.rentals.map((r) => ({
          item: {
            id: r.item.id,
            name: r.item.name,
            pricePerDay: r.item.pricePerDay,
            type: 'rental' as const,
            specs: r.item.specs,
            image: r.item.image,
            imageAlt: r.item.imageAlt,
            category: r.item.category,
            status: r.item.status,
          },
          pickupDate: r.pickupDate,
          returnDate: r.returnDate,
        })),
      }),
    },
  ),
);
