
export interface BusinessConfig {
    id?: string;
    name: string;
    tax_id: string;
    address: string;
    default_vat_group: string;
    revenue_tier: 'under_500m' | '500m_3b' | 'over_3b';
    pit_method: 'REVENUE_PERCENT' | 'PROFIT' | string;
    annual_revenue_estimate: number;
    track_inventory: boolean;
    track_cash: boolean;
    cash_balance: number;
    bank_balance: number;
    inv_phone?: string;
    inv_email?: string;
    inv_bank_account?: string;
    inv_bank_name?: string;
    inv_logo?: string;
    inv_serial?: string;
    inv_counter?: number;
    inv_note?: string;
    created_at?: string;
    updated_at?: string;
    user_id?: string;
}

export interface Category {
    id: string;
    type: 'income' | 'expense';
    name: string;
    icon: string;
    s2c_group?: string | null;
    sort_order: number;
    user_id?: string;
}

export interface Wallet {
    id: string;
    name: string;
    icon: string;
    type: 'cash' | 'bank' | 'ewallet';
    sort_order: number;
    user_id?: string;
}

export interface Transaction {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    tx_date: string;
    category_id?: string;
    category_name: string;
    payment_method?: string;
    has_invoice: boolean;
    status: 'confirmed' | 'draft' | 'void';
    counterparty?: string;
    reconciled: boolean;
    vat_group?: string;
    invoice_img?: string | null;
    invoice_thumb?: string | null;
    created_at?: string;
    updated_at?: string;
    user_id?: string;
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

export interface InventoryItem {
    id: string;
    name: string;
    unit: string;
    opening_qty: number;
    opening_value: number;
    movements: InventoryMovement[];
    user_id?: string;
}

export interface InvoiceItem {
    id?: string;
    invoice_id?: string;
    name: string;
    qty: number;
    price: number;
    unit?: string;
    amount?: number;
}

export interface Invoice {
    id: string | number;
    number: string;
    serial: string;
    date: string;
    buyer: string; // mapped from buyer_name
    buyer_tax_id?: string;
    buyer_company?: string;
    buyer_address?: string;
    payment_method?: string;
    total: number;
    status: 'draft' | 'published' | 'void';
    note?: string;
    items: InvoiceItem[];
    created_at?: string;
}
