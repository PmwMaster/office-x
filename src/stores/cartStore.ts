import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProductItem, ServiceItem, RentalCartEntry } from '../types';

interface CartProductEntry {
  product: ProductItem;
  quantity: number;
}

interface CartState {
  products: CartProductEntry[];
  services: ServiceItem[];
  rentals: RentalCartEntry[];
  addProduct: (product: ProductItem) => void;
  removeProduct: (productId: string) => void;
  increaseProductQty: (productId: string) => void;
  decreaseProductQty: (productId: string) => void;
  addService: (service: ServiceItem) => void;
  removeService: (serviceId: string) => void;
  addRental: (entry: RentalCartEntry) => void;
  removeRental: (rentalId: string) => void;
  clearAll: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      products: [],
      services: [],
      rentals: [],

      addProduct: (product) => set((state) => {
        const existing = state.products.find((p) => p.product.id === product.id);
        if (existing) {
          return { products: state.products.map((p) => p.product.id === product.id ? { ...p, quantity: p.quantity + 1 } : p) };
        }
        return { products: [...state.products, { product, quantity: 1 }] };
      }),

      removeProduct: (productId) => set((state) => ({
        products: state.products.filter((p) => p.product.id !== productId),
      })),

      increaseProductQty: (productId) => set((state) => ({
        products: state.products.map((p) => p.product.id === productId ? { ...p, quantity: p.quantity + 1 } : p),
      })),

      decreaseProductQty: (productId) => set((state) => {
        const existing = state.products.find((p) => p.product.id === productId);
        if (existing && existing.quantity <= 1) {
          return { products: state.products.filter((p) => p.product.id !== productId) };
        }
        return {
          products: state.products.map((p) => p.product.id === productId ? { ...p, quantity: p.quantity - 1 } : p),
        };
      }),

      addService: (service) => set((state) => {
        if (state.services.find((s) => s.id === service.id)) return state;
        return { services: [...state.services, service] };
      }),

      removeService: (serviceId) => set((state) => ({
        services: state.services.filter((s) => s.id !== serviceId),
      })),

      addRental: (entry) => set((state) => {
        if (state.rentals.find((r) => r.item.id === entry.item.id)) return state;
        return { rentals: [...state.rentals, entry] };
      }),

      removeRental: (rentalId) => set((state) => ({
        rentals: state.rentals.filter((r) => r.item.id !== rentalId),
      })),

      clearAll: () => set({ products: [], services: [], rentals: [] }),

      getTotalItems: () => {
        const state = get();
        return state.products.reduce((sum, p) => sum + p.quantity, 0) + state.services.length + state.rentals.length;
      },

      getTotalPrice: () => {
        const state = get();
        const productTotal = state.products.reduce((sum, p) => sum + p.product.price * p.quantity, 0);
        const serviceTotal = state.services.reduce((sum, s) => sum + s.price, 0);
        const rentalTotal = state.rentals.reduce((sum, r) => sum + r.item.pricePerDay, 0);
        return productTotal + serviceTotal + rentalTotal;
      },
    }),
    { name: 'office-x-cart' },
  ),
);
