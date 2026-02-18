import { supabase } from './supabase';
import type { Transaction, BusinessConfig, Category, Wallet, InventoryItem, InventoryMovement } from '../types';

// ─── Business Config ─────────────────────────────────────────────────────────

export async function loadBusinessConfig(): Promise<BusinessConfig | null> {
    const { data, error } = await supabase
        .from('business_config')
        .select('*')
        .limit(1)
        .single();
    if (error) { console.error('loadBusinessConfig error:', error); return null; }
    return data as BusinessConfig;
}

export async function saveBusinessConfig(config: Partial<BusinessConfig>): Promise<boolean> {
    // Get existing row id
    const { data: existing } = await supabase
        .from('business_config')
        .select('id')
        .limit(1)
        .single();

    if (existing) {
        const { error } = await supabase
            .from('business_config')
            .update({ ...config, updated_at: new Date().toISOString() })
            .eq('id', existing.id);
        if (error) { console.error('saveBusinessConfig error:', error); return false; }
    } else {
        const { error } = await supabase
            .from('business_config')
            .insert(config);
        if (error) { console.error('saveBusinessConfig insert error:', error); return false; }
    }
    return true;
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function loadCategories(): Promise<{ income: Category[]; expense: Category[] }> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
    if (error) { console.error('loadCategories error:', error); return { income: [], expense: [] }; }
    const cats = (data || []) as (Category & { type: string })[];
    return {
        income: cats.filter(c => c.type === 'income'),
        expense: cats.filter(c => c.type === 'expense'),
    };
}

export async function saveCategory(cat: Category & { type: string }): Promise<boolean> {
    const { error } = await supabase
        .from('categories')
        .upsert(cat, { onConflict: 'id' });
    if (error) { console.error('saveCategory error:', error); return false; }
    return true;
}

export async function deleteCategory(id: string): Promise<boolean> {
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) { console.error('deleteCategory error:', error); return false; }
    return true;
}

// ─── Wallets ─────────────────────────────────────────────────────────────────

export async function loadWallets(): Promise<Wallet[]> {
    const { data, error } = await supabase
        .from('wallets')
        .select('*')
        .order('sort_order', { ascending: true });
    if (error) { console.error('loadWallets error:', error); return []; }
    return (data || []) as Wallet[];
}

// ─── Transactions ────────────────────────────────────────────────────────────

export async function loadTransactions(): Promise<Transaction[]> {
    const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('tx_date', { ascending: false });
    if (error) { console.error('loadTransactions error:', error); return []; }
    return (data || []) as Transaction[];
}

export async function addTransaction(tx: Omit<Transaction, 'id'>): Promise<Transaction | null> {
    const { data, error } = await supabase
        .from('transactions')
        .insert(tx)
        .select()
        .single();
    if (error) { console.error('addTransaction error:', error); return null; }
    return data as Transaction;
}

export async function updateTransaction(tx: Transaction): Promise<boolean> {
    const { error } = await supabase
        .from('transactions')
        .update({ ...tx, updated_at: new Date().toISOString() })
        .eq('id', tx.id);
    if (error) { console.error('updateTransaction error:', error); return false; }
    return true;
}

export async function deleteTransaction(id: string): Promise<boolean> {
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (error) { console.error('deleteTransaction error:', error); return false; }
    return true;
}

// ─── Inventory ───────────────────────────────────────────────────────────────

export async function loadInventory(): Promise<InventoryItem[]> {
    const { data: items, error: itemsErr } = await supabase
        .from('inventory_items')
        .select('*')
        .order('created_at', { ascending: true });
    if (itemsErr) { console.error('loadInventory error:', itemsErr); return []; }

    const { data: movements, error: movErr } = await supabase
        .from('inventory_movements')
        .select('*')
        .order('date', { ascending: true });
    if (movErr) { console.error('loadMovements error:', movErr); }

    const movementsByItem: Record<string, InventoryMovement[]> = {};
    (movements || []).forEach((m: any) => {
        if (!movementsByItem[m.item_id]) movementsByItem[m.item_id] = [];
        movementsByItem[m.item_id].push({
            id: m.id,
            date: m.date,
            type: m.type,
            doc: m.doc,
            desc: m.desc,
            qty: Number(m.qty),
            price: Number(m.price),
        });
    });

    return (items || []).map((item: any) => ({
        id: item.id,
        name: item.name,
        unit: item.unit,
        opening_qty: Number(item.opening_qty),
        opening_value: Number(item.opening_value),
        movements: movementsByItem[item.id] || [],
    }));
}

export async function saveInventoryItem(item: Omit<InventoryItem, 'movements'>): Promise<InventoryItem | null> {
    const { data, error } = await supabase
        .from('inventory_items')
        .upsert({
            id: item.id || undefined,
            name: item.name,
            unit: item.unit,
            opening_qty: item.opening_qty,
            opening_value: item.opening_value,
        })
        .select()
        .single();
    if (error) { console.error('saveInventoryItem error:', error); return null; }
    return { ...data, movements: [] } as InventoryItem;
}

export async function addMovement(itemId: string, movement: Omit<InventoryMovement, 'id'>): Promise<InventoryMovement | null> {
    const { data, error } = await supabase
        .from('inventory_movements')
        .insert({ ...movement, item_id: itemId })
        .select()
        .single();
    if (error) { console.error('addMovement error:', error); return null; }
    return data as InventoryMovement;
}

export async function deleteInventoryItem(id: string): Promise<boolean> {
    const { error } = await supabase.from('inventory_items').delete().eq('id', id);
    if (error) { console.error('deleteInventoryItem error:', error); return false; }
    return true;
}

export async function deleteMovement(id: string): Promise<boolean> {
    const { error } = await supabase.from('inventory_movements').delete().eq('id', id);
    if (error) { console.error('deleteMovement error:', error); return false; }
    return true;
}
