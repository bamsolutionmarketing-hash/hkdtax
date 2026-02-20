
export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  tx_date: string;
  category_id: string;
  category_name: string;
  payment_method: string;
  has_invoice: boolean;
  status: 'confirmed' | 'draft' | 'void';
  counterparty?: string;
  reconciled: boolean;
  vat_group?: string;
  invoice_img?: string | null;
  invoice_thumb?: string | null;
}

export interface BusinessConfig {
  name: string;
  tax_id: string;
  address: string;
  default_vat_group: string;
  revenue_tier: 'under_500m' | '500m_3b' | 'over_3b';
  pit_method: 'REVENUE_PERCENT' | 'PROFIT' | '';
  annual_revenue_estimate: number;
  track_inventory: boolean;
  track_cash: boolean;
  cash_balance: number;
  bank_balance: number;
  inv_phone?: string;
  inv_email?: string;
  inv_bank_account?: string;
  inv_bank_name?: string;
  inv_logo?: string | null;
  inv_serial?: string;
  inv_counter?: number;
  inv_note?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  s2c_group?: string;
}

export interface Wallet {
  id: string;
  name: string;
  icon: string;
  type: 'cash' | 'bank' | 'ewallet';
}

export interface InventoryItem {
  id: string;
  name: string;
  unit: string;
  opening_qty: number;
  opening_value: number;
  movements: InventoryMovement[];
}

export interface InventoryMovement {
  id: string;
  date: string;
  type: 'in' | 'out';
  doc: string;
  desc: string;
  qty: number;
  price: number;
}

export interface Invoice {
  id: string;
  user_id?: string;
  date: string;
  number: string;
  serial: string;
  buyer_name: string;
  buyer_tax_id: string;
  total_amount: number;
  status: 'draft' | 'published' | 'void';
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoice_id?: string;
  item_name: string;
  quantity: number;
  unit_price: number;
  amount: number;
}
