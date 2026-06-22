export interface ProductItem {
  id: string;
  name: string;
  price: number;
  type: 'sale';
  specs: string;
  image: string;
  imageAlt: string;
  category: ProductCategory;
  brand?: string;
}

export type ProductCategory = 'headsets' | 'earpads' | 'cables' | 'amps' | 'microphones' | 'accessories';

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  peripheral_brand: string;
  peripheral_model: string;
  type: 'service';
  description: string;
  category: ServiceCategory;
  image?: string;
  imageAlt?: string;
  details: string[];
}

export type ServiceCategory = 'maintenance' | 'customization' | 'assembly';

export type CartItem = ProductItem | ServiceItem;

export type OSPriority = 'normal' | 'urgent' | 'warranty';

export type OSStatus = 'triage' | 'waiting_parts' | 'modding_bench' | 'done';

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

export interface RentalItem {
  id: string;
  name: string;
  pricePerDay: number;
  status: 'available' | 'in_use';
  specs: string;
  image: string;
  imageAlt: string;
  category: ProductCategory;
  type: 'rental';
}

export interface RentalCartEntry {
  item: RentalItem;
  pickupDate: string;
  returnDate: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  website: string;
  featured: boolean;
}

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
}

export interface CartProductEntry {
  product: ProductItem;
  quantity: number;
}

export interface CartState {
  products: CartProductEntry[];
  services: ServiceItem[];
  rentals: RentalCartEntry[];
}
