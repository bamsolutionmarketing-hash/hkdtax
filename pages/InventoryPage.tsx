
import React, { useState } from 'react';
import { InventoryItem, BusinessConfig } from '../types';
import { calcInventory, fmtVND, fmtDate } from '../utils';
import { Icons } from '../constants';

interface InventoryProps {
    inventory: InventoryItem[];
    setInventory: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
    business: BusinessConfig;
    addToast: (t: any) => void;
}

const InventoryPage: React.FC<InventoryProps> = ({ inventory, setInventory, business, addToast }) => {
    const [selected, setSelected] = useState<string | null>(inventory[0]?.id || null);
    const [showAdd, setShowAdd] = useState(false);
    
    const activeItem = inventory.find(i => i.id === selected);
    const results = activeItem ? calcInventory(activeItem) : null;

    const addItem = () => {
        const name = prompt("Tên hàng hóa mới:");
        const unit = prompt("Đơn vị tính (kg, cái, thùng...):");
        if (name && unit) {
            const newItem: InventoryItem = {
                id: `inv-${Date.now()}`,
                name,
                unit,
                opening_qty: 0,
                opening_value: 0,
                movements: []
            };
            setInventory(prev => [...prev, newItem]);
            setSelected(newItem.id);
            addToast({ type: 'success', title: 'Đã thêm hàng hóa', detail: name });
        }
    };

    return (
        <div className="p-6 lg:p-10 fade-up space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-extrabold">Kho hàng (S2d)</h1>
                    <p className="text-[#6B6560]">Quản lý nhập xuất tồn theo TT152/2025</p>
                </div>
                <button onClick={addItem} className="bg-[#1A1814] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2">
                    <Icons.Plus /> Thêm hàng hóa
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar list */}
                <div className="lg:col-span-1 space-y-2">
                    {inventory.map(item => {
                        const { endQty } = calcInventory(item);
                        return (
                            <button key={item.id} onClick={() => setSelected(item.id)} className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selected === item.id ? 'border-[#E85D2C] bg-[#FFF0EA]' : 'border-[#E8E4DE] bg-white'}`}>
                                <div className="font-bold text-sm truncate">{item.name}</div>
                                <div className="text-xs text-[#9B9590] mt-1">Tồn: <span className="font-bold text-[#E85D2C]">{endQty} {item.unit}</span></div>
                            </button>
                        );
                    })}
                </div>

                {/* Main detail */}
                <div className="lg:col-span-3 space-y-6">
                    {activeItem && results ? (
                        <div className="bg-white rounded-2xl border border-[#E8E4DE] overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-[#F0ECE6] flex items-center justify-between">
                                <h2 className="font-bold text-lg">{activeItem.name} — Bảng kê chi tiết</h2>
                                <button onClick={() => setShowAdd(true)} className="bg-[#E85D2C] text-white px-4 py-2 rounded-lg text-xs font-bold">Ghi nhập/xuất</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-[#F5F4F0] text-[#9B9590] uppercase font-black tracking-widest border-b border-[#F0ECE6]">
                                        <tr>
                                            <th className="p-4">Ngày</th>
                                            <th className="p-4">Chứng từ</th>
                                            <th className="p-4 text-right">Nhập</th>
                                            <th className="p-4 text-right">Xuất</th>
                                            <th className="p-4 text-right">Đơn giá</th>
                                            <th className="p-4 text-right">Tồn</th>
                                            <th className="p-4 text-right">Giá trị tồn</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#F0ECE6]">
                                        <tr className="bg-[#FFF8F0] font-bold italic">
                                            <td className="p-4" colSpan={5}>Số dư đầu kỳ</td>
                                            <td className="p-4 text-right">{activeItem.opening_qty}</td>
                                            <td className="p-4 text-right">{fmtVND(activeItem.opening_value)}</td>
                                        </tr>
                                        {results.rows.map(r => (
                                            <tr key={r.id}>
                                                <td className="p-4 text-[#6B6560]">{fmtDate(r.date)}</td>
                                                <td className="p-4 font-mono font-bold text-[#3B7DD8]">{r.doc}</td>
                                                <td className="p-4 text-right font-bold text-[#2D9F6F]">{r.inQty || '-'}</td>
                                                <td className="p-4 text-right font-bold text-[#E85D2C]">{r.outQty || '-'}</td>
                                                <td className="p-4 text-right text-[#9B9590]">{fmtVND(r.unitPrice)}</td>
                                                <td className="p-4 text-right font-black">{r.stockQty}</td>
                                                <td className="p-4 text-right font-mono">{fmtVND(r.stockVal)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="p-20 text-center bg-white rounded-3xl border-2 border-dashed border-[#E8E4DE]">
                            <div className="text-4xl mb-4">📦</div>
                            <div className="text-[#9B9590] font-bold">Hãy chọn hoặc thêm hàng hóa để bắt đầu</div>
                        </div>
                    )}
                </div>
            </div>

            {showAdd && activeItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1A1814]/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-md rounded-3xl p-8 space-y-6 fade-up shadow-2xl">
                        <h2 className="text-xl font-bold">Nhập/Xuất kho: {activeItem.name}</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[0.6rem] font-black uppercase text-[#9B9590]">Số lượng</label>
                                    <input id="qty" type="number" className="w-full border-2 border-[#E8E4DE] rounded-xl p-3 font-bold" defaultValue="1" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[0.6rem] font-black uppercase text-[#9B9590]">Đơn giá</label>
                                    <input id="price" type="number" className="w-full border-2 border-[#E8E4DE] rounded-xl p-3 font-bold" placeholder="VND" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[0.6rem] font-black uppercase text-[#9B9590]">Loại</label>
                                <select id="type" className="w-full border-2 border-[#E8E4DE] rounded-xl p-3 font-bold bg-white">
                                    <option value="in">📥 Nhập kho</option>
                                    <option value="out">📤 Xuất kho</option>
                                </select>
                            </div>
                            <button onClick={() => {
                                const q = Number((document.getElementById('qty') as HTMLInputElement).value);
                                const p = Number((document.getElementById('price') as HTMLInputElement).value);
                                const t = (document.getElementById('type') as HTMLSelectElement).value as 'in' | 'out';
                                
                                setInventory(prev => prev.map(it => it.id === activeItem.id ? {
                                    ...it,
                                    movements: [...it.movements, { id: Date.now().toString(), date: new Date().toISOString().split('T')[0], type: t, doc: 'HD' + Date.now().toString().slice(-4), desc: t === 'in' ? 'Nhập hàng' : 'Xuất dùng', qty: q, price: p }]
                                } : it));
                                setShowAdd(false);
                                addToast({ type: 'success', title: 'Đã cập nhật kho' });
                            }} className="w-full bg-[#1A1814] text-white py-4 rounded-xl font-bold">Xác nhận</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryPage;
