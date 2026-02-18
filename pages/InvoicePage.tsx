
import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import { Icons } from '../constants';
import { fmtVND, numToVietnamese } from '../utils';

interface InvoicePageProps {
  business: BusinessConfig;
  setBusiness: React.Dispatch<React.SetStateAction<BusinessConfig>>;
  invoices: any[];
  setInvoices: React.Dispatch<React.SetStateAction<any[]>>;
  addToast: (t: any) => void;
}

const InvoicePage: React.FC<InvoicePageProps> = ({ business, setBusiness, invoices, setInvoices, addToast }) => {
    const [view, setView] = useState<'list' | 'create'>('list');
    const [formData, setFormData] = useState({
        buyer_name: "",
        buyer_tax_id: "",
        items: [{ name: "", qty: 1, price: 0 }]
    });

    const createInv = () => {
        const total = formData.items.reduce((s, it) => s + (it.qty * it.price), 0);
        const newInv = {
            id: Date.now(),
            number: String(business.inv_counter).padStart(7, '0'),
            serial: business.inv_serial,
            date: new Date().toISOString().split('T')[0],
            buyer: formData.buyer_name || "Khách lẻ",
            total,
            status: 'draft'
        };
        setInvoices([newInv, ...invoices]);
        setBusiness(prev => ({ ...prev, inv_counter: (prev.inv_counter || 1) + 1 }));
        setView('list');
        addToast({ type: 'success', title: 'Đã lập hóa đơn', detail: `Số ${newInv.number}` });
    };

    return (
        <div className="p-6 lg:p-10 fade-up space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Hóa đơn điện tử</h1>
                    <p className="text-[#6B6560] mt-1">Mẫu 6A (HĐ Bán hàng) theo NĐ123/TT78</p>
                </div>
                <button onClick={() => setView('create')} className="bg-[#E85D2C] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2">
                    <Icons.Plus /> Lập hóa đơn mới
                </button>
            </div>

            {view === 'list' ? (
                <div className="bg-white rounded-3xl border border-[#E8E4DE] shadow-sm overflow-hidden">
                    <div className="divide-y divide-[#F0ECE6]">
                        {invoices.length > 0 ? invoices.map(inv => (
                            <div key={inv.id} className="p-6 flex items-center gap-6 hover:bg-[#FAFAF7] transition-colors">
                                <div className="text-[#E85D2C] font-mono font-bold text-sm bg-[#FFF0EA] px-3 py-1 rounded-lg">
                                    {inv.serial} - {inv.number}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-bold text-sm truncate">{inv.buyer}</div>
                                    <div className="text-[0.7rem] text-[#9B9590] mt-0.5">{inv.date}</div>
                                </div>
                                <div className="text-right">
                                    <div className="font-black text-[#1A1814]">{fmtVND(inv.total)}</div>
                                    <div className="text-[0.6rem] font-black uppercase text-[#2D9F6F] mt-1 tracking-widest">Đã phát hành</div>
                                </div>
                                <button className="p-2 text-[#9B9590] hover:text-[#1A1814] transition-colors"><Icons.Download /></button>
                            </div>
                        )) : (
                            <div className="p-32 text-center text-[#9B9590] space-y-4">
                                <div className="text-5xl">📄</div>
                                <div className="font-medium">Chưa có hóa đơn nào được lập</div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#E8E4DE] p-8 shadow-2xl space-y-8 fade-up">
                    <h2 className="text-xl font-bold border-b border-[#F0ECE6] pb-4">Thông tin hóa đơn</h2>
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <label className="text-[0.65rem] font-black text-[#9B9590] uppercase tracking-widest">Người mua hàng</label>
                            <input value={formData.buyer_name} onChange={e => setFormData({...formData, buyer_name: e.target.value})} className="w-full border-2 border-[#E8E4DE] rounded-xl p-3 font-bold" placeholder="Tên khách hàng hoặc Công ty" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[0.65rem] font-black text-[#9B9590] uppercase tracking-widest">Mã số thuế người mua</label>
                            <input value={formData.buyer_tax_id} onChange={e => setFormData({...formData, buyer_tax_id: e.target.value})} className="w-full border-2 border-[#E8E4DE] rounded-xl p-3 font-mono font-bold" placeholder="0123..." />
                        </div>
                        
                        <div className="space-y-3">
                            <label className="text-[0.65rem] font-black text-[#9B9590] uppercase tracking-widest">Hàng hóa / Dịch vụ</label>
                            {formData.items.map((it, idx) => (
                                <div key={idx} className="grid grid-cols-12 gap-3">
                                    <input value={it.name} onChange={e => {
                                        const newItems = [...formData.items];
                                        newItems[idx].name = e.target.value;
                                        setFormData({...formData, items: newItems});
                                    }} className="col-span-6 border-2 border-[#E8E4DE] rounded-xl p-3 text-sm font-bold" placeholder="Tên hàng" />
                                    <input type="number" value={it.qty} onChange={e => {
                                        const newItems = [...formData.items];
                                        newItems[idx].qty = Number(e.target.value);
                                        setFormData({...formData, items: newItems});
                                    }} className="col-span-2 border-2 border-[#E8E4DE] rounded-xl p-3 text-sm font-bold text-center" />
                                    <input type="number" value={it.price} onChange={e => {
                                        const newItems = [...formData.items];
                                        newItems[idx].price = Number(e.target.value);
                                        setFormData({...formData, items: newItems});
                                    }} className="col-span-4 border-2 border-[#E8E4DE] rounded-xl p-3 text-sm font-bold text-right" placeholder="Đơn giá" />
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 flex gap-4">
                            <button onClick={() => setView('list')} className="flex-1 py-4 font-bold border-2 border-[#E8E4DE] rounded-2xl">Quay lại</button>
                            <button onClick={createInv} className="flex-1 py-4 font-bold bg-[#E85D2C] text-white rounded-2xl shadow-xl shadow-orange-500/20">Phát hành hóa đơn</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoicePage;
