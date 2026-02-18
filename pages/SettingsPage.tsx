
import React from 'react';
import { BusinessConfig } from '../types';
// Import HKDTAX_LOGO from constants
import { Icons, VAT_GROUPS, HKDTAX_LOGO } from '../constants';

interface SettingsProps {
  business: BusinessConfig;
  setBusiness: React.Dispatch<React.SetStateAction<BusinessConfig>>;
  addToast: (t: any) => void;
}

const SettingsPage: React.FC<SettingsProps> = ({ business, setBusiness, addToast }) => {
    const update = (key: string, val: any) => {
        setBusiness(prev => ({ ...prev, [key]: val }));
        addToast({ type: 'success', title: 'Đã cập nhật', detail: `Thay đổi ${key} đã được lưu` });
    };

    return (
        <div className="p-6 lg:p-10 fade-up space-y-10">
            <h1 className="text-3xl font-extrabold tracking-tight">Cài đặt</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Business Profile */}
                <div className="bg-white rounded-3xl border border-[#E8E4DE] p-8 shadow-sm space-y-6">
                    <h3 className="font-bold text-lg border-b border-[#F0ECE6] pb-4">Hồ sơ hộ kinh doanh</h3>
                    <div className="space-y-4">
                        <Input label="Tên hộ kinh doanh" value={business.name} onChange={v => update('name', v)} />
                        <Input label="Mã số thuế" value={business.tax_id} onChange={v => update('tax_id', v)} />
                        <Input label="Địa chỉ" value={business.address} onChange={v => update('address', v)} />
                    </div>
                </div>

                {/* Tax Config */}
                <div className="bg-white rounded-3xl border border-[#E8E4DE] p-8 shadow-sm space-y-6">
                    <h3 className="font-bold text-lg border-b border-[#F0ECE6] pb-4">Cấu hình thuế 2026</h3>
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[0.65rem] font-black text-[#9B9590] uppercase tracking-widest">Phương pháp tính PIT</label>
                            <select value={business.pit_method} onChange={e => update('pit_method', e.target.value)} className="w-full border-2 border-[#E8E4DE] rounded-xl p-3 font-bold bg-white outline-none focus:border-[#E85D2C]">
                                <option value="REVENUE_PERCENT">Theo % doanh thu (Luật 109)</option>
                                <option value="PROFIT">Theo lợi nhuận (Chi phí trừ thu nhập)</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[0.65rem] font-black text-[#9B9590] uppercase tracking-widest">Nhóm ngành mặc định</label>
                            <select value={business.default_vat_group} onChange={e => update('default_vat_group', e.target.value)} className="w-full border-2 border-[#E8E4DE] rounded-xl p-3 font-bold bg-white outline-none focus:border-[#E85D2C]">
                                {VAT_GROUPS.map(g => <option key={g.id} value={g.id}>{g.icon} {g.label}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-3xl border border-[#E8E4DE] p-8 shadow-sm space-y-6 lg:col-span-2">
                    <h3 className="font-bold text-lg border-b border-[#F0ECE6] pb-4">Tính năng hệ thống</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Toggle label="Theo dõi kho (Sổ S2d)" active={business.track_inventory} onToggle={() => update('track_inventory', !business.track_inventory)} desc="Bật để kích hoạt quản lý Nhập - Xuất - Tồn cho nguyên liệu & hàng hóa." />
                        <Toggle label="Theo dõi dòng tiền (Sổ S2e)" active={business.track_cash} onToggle={() => update('track_cash', !business.track_cash)} desc="Tự động tính toán số dư tiền mặt và ngân hàng dựa trên các giao dịch." />
                    </div>
                </div>
            </div>

            <div className="flex justify-center py-10 opacity-30">
                <img src={HKDTAX_LOGO} className="w-12 h-12 grayscale" alt="Logo" />
                <div className="text-[0.6rem] font-black uppercase tracking-widest mt-4 ml-4">Phiên bản v3.0.1 • 2026 Ready</div>
            </div>
        </div>
    );
};

function Input({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
    return (
        <div className="space-y-1">
            <label className="text-[0.65rem] font-black text-[#9B9590] uppercase tracking-widest">{label}</label>
            <input value={value} onChange={e => onChange(e.target.value)} className="w-full border-2 border-[#E8E4DE] rounded-xl p-3 font-bold outline-none focus:border-[#E85D2C] transition-colors" />
        </div>
    );
}

function Toggle({ label, active, onToggle, desc }: { label: string, active: boolean, onToggle: () => void, desc: string }) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FAFAF7] border border-[#F0ECE6]">
            <button onClick={onToggle} className={`w-12 h-6 rounded-full transition-colors relative flex-shrink-0 mt-1 ${active ? 'bg-[#E85D2C]' : 'bg-[#E8E4DE]'}`}>
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${active ? 'translate-x-6' : ''}`} />
            </button>
            <div>
                <div className="font-bold text-sm">{label}</div>
                <div className="text-[0.7rem] text-[#9B9590] mt-1 leading-relaxed">{desc}</div>
            </div>
        </div>
    );
}

export default SettingsPage;
