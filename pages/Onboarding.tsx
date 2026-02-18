
import React, { useState } from 'react';
import { Icons, VAT_GROUPS, HKDTAX_LOGO } from '../constants';

const Onboarding: React.FC<{ onComplete: (data: any) => void }> = ({ onComplete }) => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({
        name: "",
        tax_id: "",
        address: "",
        revenue_tier: "500m_3b",
        default_vat_group: "service",
        pit_method: "REVENUE_PERCENT"
    });

    const steps = [
        {
            title: "Tên hộ kinh doanh",
            content: (
                <div className="space-y-4">
                    <input autoFocus value={data.name} onChange={e => setData({...data, name: e.target.value})} className="w-full border-2 border-[#E8E4DE] rounded-2xl px-6 py-4 text-xl font-bold focus:border-[#E85D2C] outline-none" placeholder="Ví dụ: Quán Phở Hương Lan" />
                    <input value={data.tax_id} onChange={e => setData({...data, tax_id: e.target.value})} className="w-full border-2 border-[#E8E4DE] rounded-2xl px-6 py-4 font-bold focus:border-[#E85D2C] outline-none" placeholder="Mã số thuế (nếu có)" />
                </div>
            )
        },
        {
            title: "Quy mô doanh thu",
            content: (
                <div className="grid grid-cols-1 gap-3">
                    {[
                        { id: 'under_500m', label: 'Dưới 500 triệu/năm', desc: 'Được miễn thuế hoàn toàn' },
                        { id: '500m_3b', label: '500 triệu - 3 tỷ/năm', desc: 'Nộp thuế khoán/kê khai' },
                        { id: 'over_3b', label: 'Trên 3 tỷ/năm', desc: 'Bắt buộc kê khai đầy đủ' }
                    ].map(t => (
                        <button key={t.id} onClick={() => setData({...data, revenue_tier: t.id as any})} className={`p-6 rounded-2xl border-2 text-left transition-all ${data.revenue_tier === t.id ? 'border-[#E85D2C] bg-[#FFF0EA]' : 'border-[#E8E4DE] hover:border-[#9B9590]'}`}>
                            <div className="font-bold">{t.label}</div>
                            <div className="text-xs opacity-60 mt-1">{t.desc}</div>
                        </button>
                    ))}
                </div>
            )
        }
    ];

    const next = () => {
        if (step < steps.length - 1) setStep(step + 1);
        else onComplete(data);
    };

    return (
        <div className="fixed inset-0 bg-[#1A1814] flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 fade-up space-y-10">
                <div className="flex justify-center">
                    <img src={HKDTAX_LOGO} className="w-20 h-20 rounded-2xl shadow-xl" alt="Logo" />
                </div>
                
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black tracking-tight">{steps[step].title}</h1>
                    <p className="text-[#9B9590] font-medium">Chào mừng bạn đến với HKD Tax 2026</p>
                </div>

                {steps[step].content}

                <div className="flex gap-4">
                    {step > 0 && <button onClick={() => setStep(step-1)} className="flex-1 py-5 rounded-2xl font-bold border-2 border-[#E8E4DE]">Quay lại</button>}
                    <button onClick={next} disabled={step === 0 && !data.name} className="flex-1 py-5 rounded-2xl font-bold bg-[#E85D2C] text-white disabled:opacity-30 shadow-xl shadow-orange-500/20">
                        {step === steps.length - 1 ? 'Bắt đầu ngay' : 'Tiếp tục'}
                    </button>
                </div>

                <div className="flex justify-center gap-2">
                    {steps.map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-8 bg-[#E85D2C]' : 'w-2 bg-[#E8E4DE]'}`} />)}
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
