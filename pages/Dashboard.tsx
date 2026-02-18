
import React, { useMemo } from 'react';
import { Transaction, BusinessConfig } from '../types';
// Import fmtDate from utils
import { computeTax2026, fmtVND, TAX_GATE, fmtDate } from '../utils';
import { Icons } from '../constants';

interface DashboardProps {
  transactions: Transaction[];
  business: BusinessConfig;
  setPage: (p: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, business, setPage }) => {
    const tax = useMemo(() => computeTax2026(transactions, business), [transactions, business]);
    const recent = useMemo(() => transactions.slice(0, 5), [transactions]);

    return (
        <div className="p-6 lg:p-10 fade-up space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Tổng quan</h1>
                    <p className="text-[#6B6560] mt-1">Quý 1/2026 — {business.name}</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => setPage('transactions')} className="bg-[#E85D2C] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition-transform flex items-center gap-2">
                        <Icons.Plus /> Thêm giao dịch
                    </button>
                </div>
            </div>

            {/* Tax Awareness Card */}
            <div className={`p-6 rounded-2xl border-2 flex items-center gap-6 ${tax.isUnderGate ? 'bg-[#EDFAF3] border-[#2D9F6F]/20 text-[#2D9F6F]' : 'bg-[#FFF0EA] border-[#E85D2C]/20 text-[#E85D2C]'}`}>
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-3xl shadow-sm">
                    {tax.isUnderGate ? '🛡️' : '📊'}
                </div>
                <div className="flex-1">
                    <div className="font-extrabold text-lg">
                        {tax.isUnderGate ? 'Doanh thu năm ước tính ≤ 500 triệu' : 'Đã vượt ngưỡng miễn thuế (500M)'}
                    </div>
                    <p className="text-sm opacity-80 mt-1 font-medium">
                        {tax.isUnderGate 
                            ? 'Theo Luật 109/2025: Bạn được miễn thuế GTGT và TNCN kinh doanh.' 
                            : 'Bạn cần kê khai và nộp thuế GTGT + TNCN tạm tính theo quý.'}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-[0.65rem] uppercase tracking-widest font-bold opacity-60">Thuế tạm tính</div>
                    <div className="text-2xl font-black">{tax.isUnderGate ? '0đ' : fmtVND(tax.totalTax)}</div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard label="Doanh thu" value={fmtVND(tax.revenue)} sub={`${transactions.filter(t => t.type === 'income').length} giao dịch`} color="text-[#2D9F6F]" />
                <StatCard label="Chi phí" value={fmtVND(tax.expense)} sub={`${transactions.filter(t => t.type === 'expense').length} giao dịch`} color="text-[#E85D2C]" />
                <StatCard label="Lợi nhuận" value={fmtVND(tax.profit)} sub={`${((tax.profit / (tax.revenue || 1)) * 100).toFixed(1)}% biên LN`} color="text-[#3B7DD8]" />
                <StatCard label="Hóa đơn ảnh" value={transactions.filter(t => t.invoice_img).length.toString()} sub="Đã lưu trữ" color="text-[#9B59B6]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-[#E8E4DE] overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-[#F0ECE6] flex items-center justify-between">
                        <h2 className="font-bold text-lg">Giao dịch gần đây</h2>
                        <button onClick={() => setPage('transactions')} className="text-[#E85D2C] font-bold text-xs">Xem tất cả</button>
                    </div>
                    <div className="divide-y divide-[#F0ECE6]">
                        {recent.length > 0 ? recent.map(tx => (
                            <div key={tx.id} className="p-4 flex items-center gap-4 hover:bg-[#FAFAF7] transition-colors">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${tx.type === 'income' ? 'bg-[#EDFAF3] text-[#2D9F6F]' : 'bg-[#FFF0F0] text-[#D94040]'}`}>
                                    {tx.type === 'income' ? '↗' : '↙'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-sm truncate">{tx.description}</div>
                                    <div className="text-[0.7rem] text-[#9B9590] mt-0.5">{fmtDate(tx.tx_date)} • {tx.category_name}</div>
                                </div>
                                <div className={`font-bold text-sm ${tx.type === 'income' ? 'text-[#2D9F6F]' : 'text-[#1A1814]'}`}>
                                    {tx.type === 'income' ? '+' : '-'}{fmtVND(tx.amount)}
                                </div>
                            </div>
                        )) : (
                            <div className="p-10 text-center text-[#9B9590] text-sm italic">Chưa có giao dịch nào</div>
                        )}
                    </div>
                </div>

                {/* Deadlines */}
                <div className="bg-white rounded-2xl border border-[#E8E4DE] overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-[#F0ECE6]">
                        <h2 className="font-bold text-lg">Lịch thuế Q1/2026</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <DeadlineItem label="Nộp tờ khai thuế Q1" date="30/04/2026" status="urgent" />
                        <DeadlineItem label="Nộp tiền thuế GTGT/TNCN" date="30/04/2026" status="urgent" />
                        <DeadlineItem label="Hoàn thành sổ sách S2c" date="30/04/2026" status="pending" />
                    </div>
                </div>
            </div>
        </div>
    );
};

function StatCard({ label, value, sub, color }: { label: string, value: string, sub: string, color: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-[#E8E4DE] shadow-sm hover:border-[#E85D2C]/40 transition-colors group">
            <div className="text-[0.7rem] uppercase tracking-widest font-bold text-[#9B9590] mb-2">{label}</div>
            <div className={`text-2xl font-black ${color} group-hover:scale-[1.02] transition-transform origin-left`}>{value}</div>
            <div className="text-[0.7rem] text-[#9B9590] mt-1 font-medium">{sub}</div>
        </div>
    );
}

function DeadlineItem({ label, date, status }: { label: string, date: string, status: 'urgent' | 'pending' | 'done' }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAFAF7] border border-[#F0ECE6]">
            <div className={`w-3 h-3 rounded-full ${status === 'urgent' ? 'bg-[#E85D2C] animate-pulse' : status === 'done' ? 'bg-[#2D9F6F]' : 'bg-[#E5A10E]'}`} />
            <div className="flex-1 font-semibold text-sm">{label}</div>
            <div className="text-xs font-mono font-bold text-[#6B6560]">{date}</div>
        </div>
    );
}

export default Dashboard;
