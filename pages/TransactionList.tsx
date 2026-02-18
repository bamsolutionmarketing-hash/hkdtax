
import React, { useState } from 'react';
import { Transaction, Category, Wallet } from '../types';
import { fmtVND, fmtDate, compressImage } from '../utils';
import { Icons, VAT_GROUPS } from '../constants';

interface TransactionListProps {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  categories: { income: Category[], expense: Category[] };
  wallets: Wallet[];
  addToast: (t: any) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, setTransactions, categories, wallets, addToast }) => {
    const [showAdd, setShowAdd] = useState(false);
    const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
    const [search, setSearch] = useState("");

    const filtered = transactions.filter(t => {
        const matchesFilter = filter === 'all' || t.type === filter;
        const matchesSearch = t.description.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const addTransaction = (t: Transaction) => {
        setTransactions(prev => [t, ...prev]);
        addToast({ type: 'success', title: 'Đã thêm giao dịch', detail: `${t.description} — ${fmtVND(t.amount)}` });
    };

    return (
        <div className="p-6 lg:p-10 fade-up">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Sổ thu chi</h1>
                    <p className="text-[#6B6560] mt-1">{transactions.length} giao dịch được ghi nhận</p>
                </div>
                <button onClick={() => setShowAdd(true)} className="bg-[#E85D2C] text-white px-6 py-3 rounded-xl font-bold shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-transform flex items-center gap-2">
                    <Icons.Plus /> Ghi khoản mới
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E4DE] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#F0ECE6] flex flex-wrap items-center gap-4">
                    <div className="flex bg-[#F5F4F0] p-1 rounded-xl">
                        {(['all', 'income', 'expense'] as const).map(f => (
                            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${filter === f ? 'bg-white text-[#E85D2C] shadow-sm' : 'text-[#6B6560]'}`}>
                                {f === 'all' ? 'Tất cả' : f === 'income' ? 'Thu nhập' : 'Chi phí'}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1 min-w-[240px]">
                        <input value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-[#F5F4F0] border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#E85D2C]/20" placeholder="Tìm kiếm mô tả..." />
                    </div>
                </div>

                <div className="divide-y divide-[#F0ECE6]">
                    {filtered.length > 0 ? filtered.map(tx => (
                        <div key={tx.id} className="p-6 flex flex-col sm:flex-row sm:items-center gap-6 hover:bg-[#FAFAF7] transition-colors group">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${tx.type === 'income' ? 'bg-[#EDFAF3] text-[#2D9F6F]' : 'bg-[#FFF0F0] text-[#D94040]'}`}>
                                {tx.type === 'income' ? '↗' : '↙'}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3">
                                    <div className="font-bold text-[1.05rem] truncate">{tx.description}</div>
                                    {tx.invoice_img && <span className="text-[0.6rem] bg-[#EEF4FC] text-[#3B7DD8] px-2 py-0.5 rounded font-bold uppercase tracking-wider">📷 Ảnh HĐ</span>}
                                    {tx.has_invoice && !tx.invoice_img && <span className="text-[0.6rem] bg-[#EDFAF3] text-[#2D9F6F] px-2 py-0.5 rounded font-bold uppercase tracking-wider">✓ Có HĐ</span>}
                                </div>
                                <div className="flex items-center gap-4 mt-1.5 text-xs text-[#9B9590] font-medium">
                                    <span className="flex items-center gap-1"><Icons.Clock /> {fmtDate(tx.tx_date)}</span>
                                    <span>• {tx.category_name}</span>
                                    <span>• {wallets.find(w => w.id === tx.payment_method)?.name}</span>
                                    {tx.counterparty && <span className="text-[#6B6560]">@{tx.counterparty}</span>}
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <div className={`text-lg font-black ${tx.type === 'income' ? 'text-[#2D9F6F]' : 'text-[#1A1814]'}`}>
                                    {tx.type === 'income' ? '+' : '-'}{fmtVND(tx.amount)}
                                </div>
                                {tx.vat_group && <div className="text-[0.65rem] font-bold bg-[#FFF0EA] text-[#E85D2C] px-2 py-0.5 rounded">VAT {VAT_GROUPS.find(g => g.id === tx.vat_group)?.rateLabel}</div>}
                            </div>
                        </div>
                    )) : (
                        <div className="p-20 text-center">
                            <div className="text-4xl mb-4 opacity-20">📜</div>
                            <div className="text-[#9B9590] font-medium">Không tìm thấy giao dịch nào</div>
                        </div>
                    )}
                </div>
            </div>

            {showAdd && <AddModal onClose={() => setShowAdd(false)} onAdd={addTransaction} categories={categories} wallets={wallets} />}
        </div>
    );
};

function AddModal({ onClose, onAdd, categories, wallets }: { onClose: () => void, onAdd: (t: Transaction) => void, categories: any, wallets: Wallet[] }) {
    const [type, setType] = useState<'income' | 'expense'>('expense');
    const [amount, setAmount] = useState("");
    const [desc, setDesc] = useState("");
    const [catId, setCatId] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [walletId, setWalletId] = useState(wallets[0]?.id || "cash");
    const [counterparty, setCounterparty] = useState("");
    const [hasInv, setHasInv] = useState(false);
    const [vatGroup, setVatGroup] = useState("service");
    const [img, setImg] = useState<{data:string, thumb:string} | null>(null);
    const [loading, setLoading] = useState(false);

    const cats = type === 'income' ? categories.income : categories.expense;

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLoading(true);
        try {
            const res = await compressImage(file);
            setImg(res);
            setHasInv(true);
        } catch (e) {}
        setLoading(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const amtNum = parseInt(amount.replace(/\D/g, ""));
        if (!amtNum || !desc || !catId) return;

        const tx: Transaction = {
            id: `tx-${Date.now()}`,
            type,
            amount: amtNum,
            description: desc,
            tx_date: date,
            category_id: catId,
            category_name: cats.find((c: any) => c.id === catId)?.name || "",
            payment_method: walletId,
            has_invoice: hasInv,
            status: 'confirmed',
            counterparty,
            reconciled: false,
            vat_group: type === 'income' ? vatGroup : undefined,
            invoice_img: img?.data,
            invoice_thumb: img?.thumb
        };
        onAdd(tx);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1814]/60 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden fade-up">
                <div className="px-8 py-6 border-b border-[#F0ECE6] flex items-center justify-between">
                    <h2 className="text-xl font-bold">Thêm giao dịch mới</h2>
                    <button type="button" onClick={onClose} className="p-2 hover:bg-[#F5F4F0] rounded-lg"><Icons.X /></button>
                </div>
                
                <div className="p-8 max-h-[75vh] overflow-y-auto space-y-6">
                    <div className="flex bg-[#F5F4F0] p-1 rounded-xl">
                        <button type="button" onClick={() => { setType('income'); setCatId(""); }} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${type === 'income' ? 'bg-white text-[#2D9F6F] shadow-md' : 'text-[#6B6560]'}`}>↗ Thu nhập</button>
                        <button type="button" onClick={() => { setType('expense'); setCatId(""); }} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${type === 'expense' ? 'bg-white text-[#D94040] shadow-md' : 'text-[#6B6560]'}`}>↙ Chi phí</button>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[0.7rem] uppercase tracking-widest font-black text-[#9B9590]">Số tiền (VNĐ)</label>
                        <input required value={amount} onChange={e => setAmount(e.target.value)} className="w-full border-2 border-[#E8E4DE] rounded-xl px-4 py-3 text-2xl font-black text-[#E85D2C] focus:border-[#E85D2C] focus:ring-0 outline-none transition-colors" placeholder="0" />
                    </div>

                    <div className="space-y-1">
                        <label className="text-[0.7rem] uppercase tracking-widest font-black text-[#9B9590]">Nội dung</label>
                        <input required value={desc} onChange={e => setDesc(e.target.value)} className="w-full border-2 border-[#E8E4DE] rounded-xl px-4 py-3 font-semibold focus:border-[#E85D2C] focus:ring-0 outline-none transition-colors" placeholder="Ví dụ: Mua nguyên liệu phở" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[0.7rem] uppercase tracking-widest font-black text-[#9B9590]">Ngày</label>
                            <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full border-2 border-[#E8E4DE] rounded-xl px-4 py-3 text-sm font-bold" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[0.7rem] uppercase tracking-widest font-black text-[#9B9590]">Thanh toán</label>
                            <select value={walletId} onChange={e => setWalletId(e.target.value)} className="w-full border-2 border-[#E8E4DE] rounded-xl px-4 py-3 text-sm font-bold bg-white">
                                {wallets.map(w => <option key={w.id} value={w.id}>{w.icon} {w.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[0.7rem] uppercase tracking-widest font-black text-[#9B9590]">Danh mục</label>
                        <div className="grid grid-cols-3 gap-2">
                            {cats.map((c: any) => (
                                <button key={c.id} type="button" onClick={() => setCatId(c.id)} className={`p-3 rounded-xl border-2 text-center transition-all ${catId === c.id ? 'border-[#E85D2C] bg-[#FFF0EA]' : 'border-[#E8E4DE] hover:border-[#9B9590]'}`}>
                                    <div className="text-xl mb-1">{c.icon}</div>
                                    <div className="text-[0.6rem] font-bold truncate leading-tight">{c.name}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {type === 'income' && (
                        <div className="space-y-1">
                            <label className="text-[0.7rem] uppercase tracking-widest font-black text-[#9B9590]">Nhóm VAT (TT69/2025)</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {VAT_GROUPS.map(g => (
                                    <button key={g.id} type="button" onClick={() => setVatGroup(g.id)} className={`p-3 rounded-xl border-2 flex items-center gap-3 transition-all ${vatGroup === g.id ? 'border-[#E85D2C] bg-[#FFF0EA]' : 'border-[#E8E4DE]'}`}>
                                        <span className="text-xl">{g.icon}</span>
                                        <div className="text-left flex-1 min-w-0">
                                            <div className="text-[0.65rem] font-bold truncate">{g.label}</div>
                                            <div className="text-[0.6rem] opacity-60">Thuế {g.rateLabel}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-4 pt-4 border-t border-[#F0ECE6]">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-bold text-sm">Có hóa đơn / chứng từ?</div>
                                <div className="text-xs text-[#9B9590]">Dùng để khấu trừ thuế PIT (nếu tính theo LN)</div>
                            </div>
                            <button type="button" onClick={() => setHasInv(!hasInv)} className={`w-12 h-6 rounded-full transition-colors relative ${hasInv ? 'bg-[#E85D2C]' : 'bg-[#E8E4DE]'}`}>
                                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${hasInv ? 'translate-x-6' : ''}`} />
                            </button>
                        </div>

                        {hasInv && (
                            <div className="space-y-4 animate-fadeIn">
                                <input value={counterparty} onChange={e => setCounterparty(e.target.value)} className="w-full border-2 border-[#E8E4DE] rounded-xl px-4 py-3 text-sm font-semibold" placeholder="Tên đối tác / nhà cung cấp" />
                                <div className="relative group">
                                    <input type="file" accept="image/*" onChange={handleFile} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    <div className={`p-8 border-2 border-dashed rounded-2xl text-center transition-colors ${img ? 'border-[#2D9F6F] bg-[#EDFAF3]' : 'border-[#E8E4DE] group-hover:border-[#E85D2C]'}`}>
                                        {loading ? <div className="animate-spin text-xl">⏳</div> : img ? (
                                            <div className="flex items-center justify-center gap-4">
                                                <img src={img.thumb} className="w-12 h-12 rounded shadow-sm border border-white" alt="Thumb" />
                                                <div className="text-left">
                                                    <div className="text-sm font-bold text-[#2D9F6F]">Đã đính kèm ảnh</div>
                                                    <div className="text-[0.65rem] opacity-60">Nhấn để thay đổi</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <div className="text-2xl">📷</div>
                                                <div className="text-sm font-bold">Chụp hoặc tải ảnh hóa đơn</div>
                                                <div className="text-[0.65rem] text-[#9B9590]">WebP nén tự động dưới 40KB</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-8 bg-[#F5F4F0] flex gap-4">
                    <button type="button" onClick={onClose} className="flex-1 px-6 py-4 rounded-xl font-bold border-2 border-[#E8E4DE] hover:bg-white transition-colors">Hủy</button>
                    <button type="submit" className="flex-1 px-6 py-4 rounded-xl font-bold bg-[#1A1814] text-white hover:bg-black transition-colors">Lưu giao dịch</button>
                </div>
            </form>
        </div>
    );
}

export default TransactionList;
