import { supabase } from './supabase';
import type { Transaction, BusinessConfig, Category, Wallet, InventoryItem, InventoryMovement } from '../types';

// ─── Helper: get current user_id ─────────────────────────────────────────────

async function getUserId(): Promise<string> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.id) throw new Error('Not authenticated');
    return session.user.id;
}

// ─── Seed defaults for new user ──────────────────────────────────────────────

export async function seedDefaultsForUser(userId: string): Promise<void> {
    // Check if user already has categories
    const { data: existing } = await supabase
        .from('categories')
        .select('id')
        .eq('user_id', userId)
        .limit(1);
    if (existing && existing.length > 0) return; // already seeded

    // Seed categories
    const defaultCategories = [
        { id: `${userId}_c1`, type: 'income', name: 'Doanh thu bán hàng', icon: '🛒', s2c_group: null, sort_order: 1, user_id: userId },
        { id: `${userId}_c2`, type: 'income', name: 'Doanh thu dịch vụ', icon: '🔧', s2c_group: null, sort_order: 2, user_id: userId },
        { id: `${userId}_c3`, type: 'income', name: 'Thu nhập khác', icon: '💰', s2c_group: null, sort_order: 3, user_id: userId },
        { id: `${userId}_c10`, type: 'expense', name: 'Nguyên vật liệu', icon: '📦', s2c_group: 'a', sort_order: 10, user_id: userId },
        { id: `${userId}_c18`, type: 'expense', name: 'Nhiên liệu', icon: '⛽', s2c_group: 'a', sort_order: 11, user_id: userId },
        { id: `${userId}_c19`, type: 'expense', name: 'Hàng hóa mua vào', icon: '🛍️', s2c_group: 'a', sort_order: 12, user_id: userId },
        { id: `${userId}_c11`, type: 'expense', name: 'Lương nhân viên', icon: '👷', s2c_group: 'b', sort_order: 20, user_id: userId },
        { id: `${userId}_c12`, type: 'expense', name: 'Bảo hiểm bắt buộc', icon: '🛡️', s2c_group: 'b', sort_order: 21, user_id: userId },
        { id: `${userId}_c13`, type: 'expense', name: 'Khấu hao TSCĐ', icon: '🏠', s2c_group: 'c', sort_order: 30, user_id: userId },
        { id: `${userId}_c14`, type: 'expense', name: 'Điện / Nước / Internet', icon: '💡', s2c_group: 'd', sort_order: 40, user_id: userId },
        { id: `${userId}_c21`, type: 'expense', name: 'Vận chuyển', icon: '🚚', s2c_group: 'd', sort_order: 41, user_id: userId },
        { id: `${userId}_c22`, type: 'expense', name: 'Thuê mặt bằng', icon: '🏗️', s2c_group: 'd', sort_order: 42, user_id: userId },
        { id: `${userId}_c16`, type: 'expense', name: 'Sửa chữa, bảo dưỡng', icon: '🔨', s2c_group: 'd', sort_order: 43, user_id: userId },
        { id: `${userId}_c20`, type: 'expense', name: 'Lãi vay vốn kinh doanh', icon: '🏦', s2c_group: 'đ', sort_order: 50, user_id: userId },
        { id: `${userId}_c15`, type: 'expense', name: 'Marketing, quảng cáo', icon: '📣', s2c_group: 'e', sort_order: 60, user_id: userId },
        { id: `${userId}_c17`, type: 'expense', name: 'Chi phí khác', icon: '📝', s2c_group: 'e', sort_order: 61, user_id: userId },
    ];
    await supabase.from('categories').insert(defaultCategories);

    // Seed wallets
    const defaultWallets = [
        { id: `${userId}_cash`, name: 'Tiền mặt', icon: '💵', type: 'cash', sort_order: 1, user_id: userId },
        { id: `${userId}_bank`, name: 'Chuyển khoản NH', icon: '🏦', type: 'bank', sort_order: 2, user_id: userId },
        { id: `${userId}_momo`, name: 'MoMo', icon: '📱', type: 'ewallet', sort_order: 3, user_id: userId },
    ];
    await supabase.from('wallets').insert(defaultWallets);

    // Seed business config
    await supabase.from('business_config').insert({
        name: '', tax_id: '', address: '',
        default_vat_group: 'service', revenue_tier: 'under_500m',
        pit_method: '', annual_revenue_estimate: 0,
        track_cash: true, cash_balance: 0, bank_balance: 0,
        user_id: userId,
    });
}

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
    const userId = await getUserId();
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
            .insert({ ...config, user_id: userId });
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
    const userId = await getUserId();
    const { error } = await supabase
        .from('categories')
        .upsert({ ...cat, user_id: userId }, { onConflict: 'id' });
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
    const userId = await getUserId();
    const { data, error } = await supabase
        .from('transactions')
        .insert({ ...tx, user_id: userId })
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
            id: m.id, date: m.date, type: m.type,
            doc: m.doc, desc: m.desc,
            qty: Number(m.qty), price: Number(m.price),
        });
    });

    return (items || []).map((item: any) => ({
        id: item.id, name: item.name, unit: item.unit,
        opening_qty: Number(item.opening_qty),
        opening_value: Number(item.opening_value),
        movements: movementsByItem[item.id] || [],
    }));
}

export async function saveInventoryItem(item: Omit<InventoryItem, 'movements'>): Promise<InventoryItem | null> {
    const userId = await getUserId();
    const { data, error } = await supabase
        .from('inventory_items')
        .upsert({
            id: item.id || undefined,
            name: item.name, unit: item.unit,
            opening_qty: item.opening_qty,
            opening_value: item.opening_value,
            user_id: userId,
        })
        .select()
        .single();
    if (error) { console.error('saveInventoryItem error:', error); return null; }
    return { ...data, movements: [] } as InventoryItem;
}

export async function addMovement(itemId: string, movement: Omit<InventoryMovement, 'id'>): Promise<InventoryMovement | null> {
    const userId = await getUserId();
    const { data, error } = await supabase
        .from('inventory_movements')
        .insert({ ...movement, item_id: itemId, user_id: userId })
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
