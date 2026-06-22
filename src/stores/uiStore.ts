import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  isCartSidebarOpen: boolean;
  isSearchOpen: boolean;
  themeLoading: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleCartSidebar: () => void;
  closeCartSidebar: () => void;
  setSearchOpen: (open: boolean) => void;
  setThemeLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isCartSidebarOpen: false,
  isSearchOpen: false,
  themeLoading: false,

  toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleCartSidebar: () => set((s) => ({ isCartSidebarOpen: !s.isCartSidebarOpen })),
  closeCartSidebar: () => set({ isCartSidebarOpen: false }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setThemeLoading: (loading) => set({ themeLoading: loading }),
}));
