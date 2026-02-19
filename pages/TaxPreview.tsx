
import React, { useMemo } from 'react';
import { Transaction, BusinessConfig, Category, InventoryItem } from '../types';
import { computeTax2026, fmtVND } from '../utils';
import { Icons, S2C_GROUPS, VAT_GROUPS } from '../constants';

interface TaxPreviewProps {
    transactions: Transaction[];
    business: BusinessConfig;
    addToast: (t: any) => void;
    categories: any;
    inventory: InventoryItem[];
}

const TaxPreview: React.FC<TaxPreviewProps> = ({ transactions, business, addToast, categories, inventory }) => {
    const tax = useMemo(() => computeTax2026(transactions, business), [transactions, business]);

    return (
        <div className="px-3 py-4 sm:p-6 lg:p-10 fade-up space-y-6 sm:space-y-8 overflow-x-hidden">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">Thuế & Báo cáo</h1>
                    <p className="text-[#6B6560] mt-1 text-xs sm:text-base">Căn cứ TT152/2025/TT-BTC & Luật 109/2025/QH15</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
                {/* Summary Table */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#E8E4DE] p-4 sm:p-8 shadow-sm space-y-6 sm:space-y-8">
                        <div className="flex justify-between items-end border-b-2 border-[#F0ECE6] pb-4">
                            <div>
                                <h3 className="font-black text-base sm:text-xl text-[#1A1814]">Tờ khai tạm tính Q1/2026</h3>
                                <p className="text-xs text-[#9B9590] uppercase tracking-widest font-bold mt-1">Hộ kinh doanh: {business.name}</p>
                            </div>
                            <div className="text-right">
                                <span className="px-3 py-1 bg-[#F5F4F0] rounded-full text-[0.6rem] font-black text-[#9B9590] uppercase tracking-widest">Snapshot</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <TaxRow label="Tổng doanh thu" value={fmtVND(tax.revenue)} bold />
                            <TaxRow label="Chi phí hợp lý (có HĐ)" value={fmtVND(tax.deductible)} />
                            <TaxRow label="Chi phí khác" value={fmtVND(tax.expense - tax.deductible)} dimmed />
                            <div className="h-px bg-[#F0ECE6] my-4" />
                            <TaxRow label="Thuế GTGT phải nộp" value={tax.isUnderGate ? "Miễn" : fmtVND(tax.totalVat)} color="text-[#E85D2C]" />
                            <TaxRow label="Thuế TNCN kinh doanh" value={tax.isUnderGate ? "Miễn" : fmtVND(tax.pit)} color="text-[#3B7DD8]" />
                            <div className="bg-[#1A1814] text-white p-4 sm:p-6 rounded-2xl flex justify-between items-center mt-6">
                                <span className="font-bold text-sm sm:text-lg">Tổng cộng</span>
                                <span className="text-lg sm:text-2xl font-black text-[#E85D2C]">{tax.isUnderGate ? '0đ' : fmtVND(tax.totalTax)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Ledgers */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-lg px-2">Sổ kế toán bắt buộc</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <LedgerCard code="S1a-HKD" title="Sổ doanh thu bán hàng" desc="Dùng cho HKD ≤ 500M" active={tax.isUnderGate} />
                            <LedgerCard code="S2c-HKD" title="Sổ chi tiết doanh thu chi phí" desc="Dùng cho HKD kê khai" active={!tax.isUnderGate} />
                            <LedgerCard code="S2d-HKD" title="Sổ chi tiết hàng hóa" desc="Theo dõi nhập/xuất/tồn" active={business.track_inventory} />
                            <LedgerCard code="S2e-HKD" title="Sổ chi tiết tiền" desc="Quỹ tiền mặt & NH" active={business.track_cash} />
                        </div>
                    </div>
                </div>

                {/* Side Info */}
                <div className="space-y-6">
                    <div className="bg-[#FFF9EB] border-2 border-[#E5A10E]/10 p-6 rounded-3xl space-y-4">
                        <h4 className="font-black text-xs text-[#E5A10E] uppercase tracking-widest">💡 Lưu ý quan trọng</h4>
                        <div className="space-y-3">
                            <Tip text="Bỏ hoàn toàn Thuế Khoán & Môn bài từ 01/01/2026." />
                            <Tip text="Ngưỡng miễn thuế 500M tính trên doanh thu 12 tháng liên tục." />
                            <Tip text="Mọi chi phí trên 200k cần HĐ điện tử để được khấu trừ thuế TNCN." />
                        </div>
                    </div>

                    <div className="bg-white border border-[#E8E4DE] p-6 rounded-3xl space-y-4 shadow-sm">
                        <h4 className="font-black text-xs text-[#9B9590] uppercase tracking-widest">Xuất báo cáo</h4>
                        <button onClick={() => addToast({ type: 'success', title: 'Đang khởi tạo File...', detail: 'Dữ liệu đang được kết xuất ra XLSX' })} className="w-full bg-[#3B7DD8] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                            <Icons.Download /> Tải File Excel (XLSX)
                        </button>
                        <button className="w-full border-2 border-[#E8E4DE] py-3 rounded-xl font-bold hover:bg-[#F5F4F0] transition-colors">
                            Gửi email kế toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function TaxRow({ label, value, bold, color, dimmed }: { label: string, value: string, bold?: boolean, color?: string, dimmed?: boolean }) {
    return (
        <div className={`flex justify-between items-center ${bold ? 'font-bold' : 'text-sm'} ${dimmed ? 'text-[#9B9590]' : ''}`}>
            <span>{label}</span>
            <span className={color || 'text-[#1A1814]'}>{value}</span>
        </div>
    );
}

function LedgerCard({ code, title, desc, active }: { code: string, title: string, desc: string, active: boolean }) {
    return (
        <div className={`p-5 rounded-2xl border-2 transition-all ${active ? 'border-[#2D9F6F] bg-white shadow-md' : 'border-[#E8E4DE] bg-[#F5F4F0] opacity-50'}`}>
            <div className="flex justify-between items-start mb-2">
                <span className={`text-[0.6rem] px-2 py-0.5 rounded font-black tracking-widest ${active ? 'bg-[#EDFAF3] text-[#2D9F6F]' : 'bg-[#E8E4DE] text-[#9B9590]'}`}>{code}</span>
                {active && <Icons.Check />}
            </div>
            <div className="font-bold text-sm">{title}</div>
            <div className="text-[0.65rem] text-[#9B9590] mt-1 font-medium">{desc}</div>
        </div>
    );
}

function Tip({ text }: { text: string }) {
    return (
        <div className="flex gap-2 items-start text-[0.7rem] text-[#856404] font-semibold leading-relaxed">
            <span className="mt-0.5">•</span>
            <span>{text}</span>
        </div>
    );
}

export default TaxPreview;
