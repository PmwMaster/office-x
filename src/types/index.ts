// ==================== DOMAIN TYPES (Supabase-Ready) ====================

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  type: 'sale';
  specs: string;
  image: string;
  imageAlt: string;
  category: 'switches' | 'keycaps' | 'lubricants' | 'plates' | 'stabilizers' | 'cables' | 'keyboards' | 'mice' | 'monitors' | 'audio';
}

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  peripheral_brand: string;
  peripheral_model: string;
  type: 'service';
  description: string;
  category: 'maintenance' | 'customization' | 'assembly';
  image?: string;
  imageAlt?: string;
  details: string[];
}

export type CartItem = ProductItem | ServiceItem;

export interface HybridCart {
  items: CartItem[];
  total: number;
}

// ==================== REAL PRODUCT CATALOG TYPE ====================

export interface RealProduct {
  id: string;
  brand: string;
  name: string;
  category: 'teclado' | 'mouse' | 'audio' | 'pecas' | 'locacao';
  price: number;
  specs: Record<string, string>;
  image_url: string;
  description: string;
}

// ==================== ADMIN TYPES ====================

export type OSStatus = 'triage' | 'waiting_parts' | 'modding_bench' | 'done';
export type OSPriority = 'normal' | 'urgent' | 'warranty';

export interface ServiceOrder {
  id: string;
  title: string;
  description: string;
  status: OSStatus;
  priority: OSPriority;
  technician: string;
  createdAt: string;
  tracking?: string;
  progress?: number;
}

export interface KPIStats {
  openOrders: number;
  openOrdersChange: number;
  delayedOrders: number;
  completedOrders: number;
}

// ==================== DASHBOARD TYPES ====================

export interface ProgressStep {
  label: string;
  active: boolean;
}

export interface PurchaseHistory {
  item: string;
  itemSub: string;
  id: string;
  date: string;
  status: string;
  value: number;
  icon: string;
  iconColor: string;
}

// ==================== PAYMENT TYPES ====================

export type PaymentMethod = 'credit' | 'pix';

export interface InvoiceItem {
  label: string;
  description: string;
  amount: number;
}

export interface Invoice {
  items: InvoiceItem[];
  total: number;
}

// ==================== RENTAL TYPES ====================

export interface RentalItem {
  id: string;
  name: string;
  pricePerDay: number;
  status: 'available' | 'in_use';
  specs: string;
  image: string;
  imageAlt: string;
  category: 'keyboards' | 'mice' | 'monitors' | 'audio';
  type: 'rental';
}

export interface RentalCartEntry {
  item: RentalItem;
  pickupDate: string;
  returnDate: string;
}
