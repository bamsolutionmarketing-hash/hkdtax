
import { Transaction, BusinessConfig, InventoryItem } from './types';
import { VAT_GROUPS } from './constants';

export const fmt = (n: number) => new Intl.NumberFormat("vi-VN").format(n);
export const fmtVND = (n: number) => fmt(n) + "đ";
export const fmtDate = (d: string) => { const dt = new Date(d + "T00:00:00"); return dt.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }); };
export const fmtShortDate = (d: string) => { const dt = new Date(d + "T00:00:00"); return dt.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }); };

export function numToVietnamese(n: number): string {
    if (n === 0) return "Không đồng";
    const ones = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const readGroup = (h: number, t: number, u: number, hasHigher: boolean) => {
        let s = "";
        if (h > 0) s += ones[h] + " trăm ";
        else if (hasHigher && (t > 0 || u > 0)) s += "không trăm ";
        if (t > 1) s += ones[t] + " mươi ";
        else if (t === 1) s += "mười ";
        else if (t === 0 && h > 0 && u > 0) s += "lẻ ";
        if (u === 5 && t > 0) s += "lăm";
        else if (u === 1 && t > 1) s += "mốt";
        else if (u > 0) s += ones[u];
        return s.trim();
    };
    const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];
    const str = String(Math.abs(Math.floor(n)));
    const groups: string[] = [];
    for (let i = str.length; i > 0; i -= 3) groups.unshift(str.slice(Math.max(0, i - 3), i));
    let result = "";
    const len = groups.length;
    groups.forEach((g, i) => {
        const num = parseInt(g);
        if (num === 0) return;
        const digits = g.padStart(3, "0");
        const h = parseInt(digits[0]), t = parseInt(digits[1]), u = parseInt(digits[2]);
        const txt = readGroup(h, t, u, i > 0 || len > 1);
        if (txt) result += (result ? " " : "") + txt + " " + units[len - 1 - i];
    });
    result = result.trim() + " đồng";
    return result.charAt(0).toUpperCase() + result.slice(1);
}

export const TAX_GATE = 500_000_000;

export function computeTax2026(transactions: Transaction[], config: BusinessConfig) {
    const valid = transactions.filter(t => t.status !== "void");
    const revenue = valid.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expense = valid.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const deductible = valid.filter(t => t.type === "expense" && (t.has_invoice || t.amount < 200000)).reduce((s, t) => s + t.amount, 0);
    const profit = revenue - expense;

    const annualRevenue = config.annual_revenue_estimate || revenue * 4;
    const isUnderGate = annualRevenue <= TAX_GATE;

    let totalVat = 0;
    const vatByGroup: any = {};
    VAT_GROUPS.forEach(g => { vatByGroup[g.id] = { revenue: 0, vat: 0, group: g }; });

    valid.filter(t => t.type === "income").forEach(t => {
        const gid = t.vat_group || config.default_vat_group || "service";
        if (vatByGroup[gid]) {
            vatByGroup[gid].revenue += t.amount;
        }
    });

    if (!isUnderGate) {
        Object.values(vatByGroup).forEach((g: any) => {
            g.vat = Math.round(g.revenue * g.group.rate);
            totalVat += g.vat;
        });
    }

    let pit = 0;
    let pitDetail: any = {};
    if (!isUnderGate) {
        if (config.pit_method === "PROFIT") {
            const taxableProfit = Math.max(0, revenue - deductible);
            const rate = annualRevenue <= 3_000_000_000 ? 0.15 : (annualRevenue <= 50_000_000_000 ? 0.17 : 0.20);
            pit = Math.round(taxableProfit * rate);
            pitDetail = { method: "PROFIT", taxableProfit, rate };
        } else {
            const gateForPeriod = TAX_GATE / 4;
            const excessRevenue = Math.max(0, revenue - gateForPeriod);
            const vg = VAT_GROUPS.find(g => g.id === (config.default_vat_group || "service"));
            const pctRate = vg ? vg.pitRevPct : 0.02;
            pit = Math.round(excessRevenue * pctRate);
            pitDetail = { method: "REVENUE_PERCENT", excessRevenue, rate: pctRate, gateForPeriod };
        }
    }

    return {
        revenue, expense, deductible, profit,
        annualRevenue, isUnderGate,
        vatByGroup, totalVat,
        pit, pitMethod: config.pit_method, pitDetail,
        totalTax: totalVat + pit,
        monBai: 0
    };
}

export function calcInventory(item: InventoryItem) {
    let qty = item.opening_qty, val = item.opening_value;
    const rows: any[] = [];
    item.movements.forEach(m => {
        if (m.type === "in") {
            const inVal = m.qty * m.price;
            qty += m.qty; val += inVal;
            rows.push({ ...m, unitPrice: m.price, inQty: m.qty, inVal, outQty: 0, outVal: 0, stockQty: qty, stockVal: val });
        } else {
            const outPrice = qty > 0 ? val / qty : 0;
            const outQty = Math.min(m.qty, qty);
            const outVal = Math.round(outQty * outPrice);
            qty -= outQty; val -= outVal;
            rows.push({ ...m, unitPrice: Math.round(outPrice), inQty: 0, inVal: 0, outQty, outVal, stockQty: qty, stockVal: val });
        }
    });
    return { rows, endQty: qty, endVal: val };
}

export async function compressImage(file: File, targetKB = 40): Promise<any> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = (e) => {
            img.onload = () => {
                const canvas = document.createElement("canvas");
                let w = img.width, h = img.height;
                const max = 1000;
                if (Math.max(w, h) > max) {
                    const sc = max / Math.max(w, h);
                    w *= sc; h *= sc;
                }
                canvas.width = w; canvas.height = h;
                const ctx = canvas.getContext("2d")!;
                ctx.drawImage(img, 0, 0, w, h);

                const thumbCanvas = document.createElement("canvas");
                thumbCanvas.width = 40; thumbCanvas.height = 40;
                thumbCanvas.getContext("2d")!.drawImage(img, 0, 0, 40, 40);

                const data = canvas.toDataURL("image/webp", 0.5);
                const thumb = thumbCanvas.toDataURL("image/webp", 0.5);
                resolve({ data, thumb, sizeKB: Math.round(data.length * 0.75 / 1024) });
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    });
}

export function getRiskFlags(transactions: Transaction[]) {
    const flags: any[] = [];
    const noInvoice = transactions.filter(t => t.type === "expense" && !t.has_invoice && t.amount >= 200000);
    if (noInvoice.length > 0) {
        const total = noInvoice.reduce((s, t) => s + t.amount, 0);
        flags.push({ code: "missing_invoices", severity: noInvoice.length > 3 ? "error" : "warning", title: "Thiếu hóa đơn", detail: `${noInvoice.length} giao dịch chi phí chưa có hóa đơn (tổng ${fmtVND(total)})`, count: noInvoice.length, amount: total });
    }
    const largeCash = transactions.filter(t => t.payment_method === "cash" && t.amount > 20000000);
    if (largeCash.length > 0) flags.push({ code: "large_cash", severity: "warning", title: "Giao dịch tiền mặt lớn", detail: `${largeCash.length} giao dịch tiền mặt > 20 triệu`, count: largeCash.length, amount: largeCash.reduce((s, t) => s + t.amount, 0) });
    const expense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const noInvAmt = noInvoice.reduce((s, t) => s + t.amount, 0);
    const ratio = expense > 0 ? (noInvAmt / expense) * 100 : 0;
    if (ratio > 15) flags.push({ code: "high_no_invoice_ratio", severity: ratio > 30 ? "error" : "warning", title: "Tỷ lệ không HĐ cao", detail: `${ratio.toFixed(1)}% chi phí không có hóa đơn`, count: noInvoice.length, amount: noInvAmt });
    const unreconciled = transactions.filter(t => !t.reconciled && t.payment_method === "bank_transfer");
    if (unreconciled.length > 0) flags.push({ code: "unreconciled", severity: "warning", title: "Sao kê chưa khớp", detail: `${unreconciled.length} giao dịch ngân hàng chưa đối soát`, count: unreconciled.length, amount: unreconciled.reduce((s, t) => s + t.amount, 0) });
    return flags;
}

export function getSmartSuggestions(tx: Transaction[], type: 'income' | 'expense', categories: any) {
    const r = tx.filter(t => t.type === type).slice(0, 10);
    const f: any = {};
    r.forEach(t => { f[t.category_id] = (f[t.category_id] || 0) + 1; });
    const s = Object.entries(f).sort((a: any, b: any) => b[1] - a[1]);
    const c = type === "income" ? categories.income : categories.expense;
    return s.slice(0, 3).map(([id]) => c.find((x: any) => x.id === id)).filter(Boolean);
}

export function detectDuplicate(tx: Transaction[], n: Transaction) {
    return tx.find(t => t.amount === n.amount && t.tx_date === n.tx_date && t.type === n.type);
}

// ─── Export Helpers ───

export function downloadCSV(filename: string, csvContent: string) {
    const BOM = "\uFEFF";
    const csvData = BOM + csvContent;
    try {
        const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a"); a.href = url; a.download = filename;
        a.style.display = "none"; document.body.appendChild(a); a.click();
        setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url) }, 200);
        return true;
    } catch (e1) {
        try {
            const encoded = encodeURIComponent(csvData);
            const a = document.createElement("a"); a.href = "data:text/csv;charset=utf-8," + encoded; a.download = filename;
            a.style.display = "none"; document.body.appendChild(a); a.click();
            setTimeout(() => document.body.removeChild(a), 200);
            return true;
        } catch (e2) {
            try { navigator.clipboard.writeText(csvContent); } catch (e3) { }
            return false;
        }
    }
}

export function openPrintHTML(title: string, htmlBody: string, business: BusinessConfig, opts: any = {}) {
    const mauSo = opts.mauSo || "S1a-HKD";
    const kyKhai = opts.kyKhai || "Quý .../năm 2026";
    const dvTinh = opts.dvTinh || "VNĐ";
    const soTitle = opts.soTitle || title;
    const fullHTML = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
body{font-family:'Times New Roman',serif;margin:30px 35px;font-size:13px;color:#000;line-height:1.5}
table{width:100%;border-collapse:collapse;margin:16px 0}
th,td{border:1px solid #000;padding:5px 8px;font-size:12px}
th{background:#f0f0f0;font-weight:bold;text-align:center}
td.num{text-align:right;font-family:'Courier New',monospace}
td.center{text-align:center}
.total-row{font-weight:bold;background:#f9f9f9}
.note{font-size:11px;font-style:italic;margin-top:10px}
.tt-header{display:flex;justify-content:space-between;margin-bottom:8px;border-bottom:1px solid #000;padding-bottom:10px}
.tt-left{font-size:12px;flex:1}
.tt-left b{font-size:13px}
.tt-right{text-align:right;font-size:11.5px;min-width:260px}
.tt-right .mau-so{font-weight:bold;font-size:13px;margin-bottom:2px}
.tt-right .italic{font-style:italic;line-height:1.4}
.tt-title{text-align:center;margin:14px 0 6px;font-size:17px;font-weight:bold;text-transform:uppercase;letter-spacing:1px}
.tt-meta{text-align:center;font-size:12px;margin-bottom:16px;line-height:1.8}
.tt-meta .dvt{text-align:right;font-style:italic;margin-top:4px}
.footer{margin-top:30px;display:flex;justify-content:space-between;font-size:12px}
.footer-col{text-align:center;min-width:200px}
.sign-line{margin-top:60px;font-weight:bold}
.no-print{margin:0 0 20px;padding:10px 16px;background:#f0f0f0;border-radius:6px;display:flex;align-items:center;gap:12;font-size:13px}
.no-print button{padding:8px 20px;border:none;border-radius:4px;font-weight:bold;cursor:pointer;font-size:13px;font-family:'Times New Roman',serif}
.no-print .btn-print{background:#1a3a5c;color:white}
.no-print .btn-close{background:#e0e0e0;color:#333}
@media print{.no-print{display:none!important}body{margin:15px}@page{size:A4;margin:14mm}}
</style></head><body>
<div class="no-print">
  <button class="btn-print" onclick="window.print()">🖨️ In / Lưu PDF (Ctrl+P)</button>
  <button class="btn-close" onclick="window.close()">✕ Đóng</button>
  <span style="flex:1;text-align:right;color:#666;font-style:italic">${title}</span>
</div>
<div class="tt-header">
  <div class="tt-left">
    <b>HỘ, CÁ NHÂN KINH DOANH:</b> ${business.name || "..................."}<br>
    Địa chỉ: ${business.address || "................................."}<br>
    Mã số thuế: <span style="letter-spacing:1px;font-weight:bold">${business.tax_id || "..........................."}</span>
  </div>
  <div class="tt-right">
    <div class="mau-so">Mẫu số ${mauSo}</div>
    <div class="italic">(Kèm theo Thông tư số 152/2025/TT-BTC<br>ngày 31 tháng 12 năm 2025 của Bộ trưởng<br>Bộ Tài chính)</div>
  </div>
</div>
<div class="tt-title">${soTitle}</div>
<div class="tt-meta">
  Địa điểm kinh doanh: ${business.address || "....................."}<br>
  Kỳ khai thuế: ${kyKhai}
  <div class="dvt">Đơn vị tính: ${dvTinh}</div>
</div>
${htmlBody}
<div class="footer">
  <div class="footer-col">Người ghi sổ<div class="sign-line">&nbsp;</div></div>
  <div class="footer-col">Ngày ..... tháng ..... năm 2026<br>Người đại diện HKD<div class="sign-line">${business.name || ""}</div></div>
</div>
</body></html>`;

    try {
        const w = window.open("", "_blank");
        if (w && !w.closed) { w.document.write(fullHTML); w.document.close(); return; }
    } catch (e) { }
    try {
        const iframeId = "print-overlay-" + Date.now();
        const iframe = document.createElement("iframe");
        iframe.id = iframeId;
        iframe.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;border:none;z-index:99999;background:white";
        document.body.appendChild(iframe);
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const closeScript = `<script>function closePrintOverlay(){window.parent.document.getElementById('${iframeId}').remove()}<\/script>`;
        const closeableHTML = fullHTML.replace('onclick="window.close()"', 'onclick="closePrintOverlay()"').replace('</head>', closeScript + '</head>');
        doc.open(); doc.write(closeableHTML); doc.close();
    } catch (e2) {
        console.error("Print failed:", e2);
    }
}

export const S2C_GROUPS = [
    { code: "a", label: "Chi phí nguyên liệu, vật liệu, nhiên liệu, năng lượng, hàng hóa sử dụng vào SXKD", shortLabel: "Nguyên vật liệu", color: "#e67e22", bg: "#fef5e7" },
    { code: "b", label: "Chi phí tiền lương, tiền công, phụ cấp, bảo hiểm bắt buộc và các khoản chi trả cho NLĐ", shortLabel: "Lương & Bảo hiểm", color: "#2980b9", bg: "#eaf2f8" },
    { code: "c", label: "Chi phí khấu hao tài sản cố định phục vụ cho hoạt động SXKD (nếu có)", shortLabel: "Khấu hao TSCĐ", color: "#8e44ad", bg: "#f4ecf7" },
    { code: "d", label: "Chi phí dịch vụ mua ngoài: điện, nước, điện thoại, internet, vận chuyển, thuê tài sản, sửa chữa, bảo dưỡng", shortLabel: "Dịch vụ mua ngoài", color: "#16a085", bg: "#e8f8f5" },
    { code: "đ", label: "Chi phí trả lãi tiền vay vốn sản xuất, kinh doanh", shortLabel: "Lãi vay vốn", color: "#c0392b", bg: "#fdedec" },
    { code: "e", label: "Các khoản chi khác phục vụ trực tiếp hoạt động SXKD", shortLabel: "Chi phí khác", color: "#7f8c8d", bg: "#f2f3f4" },
];

export function exportS1a(transactions: Transaction[], business: BusinessConfig) {
    const incomes = transactions.filter(t => t.type === "income").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    let csv = "STT,Ngày tháng,Số chứng từ,Diễn giải,Doanh thu (VNĐ)\n";
    let total = 0;
    incomes.forEach((t, i) => {
        csv += `${i + 1},${fmtDate(t.tx_date)},${t.has_invoice ? "HĐ" : ""},${t.description},${t.amount}\n`;
        total += t.amount;
    });
    csv += `,,,,\n,,,Cộng kỳ,${total}\n`;
    downloadCSV(`S1a-HKD_${business.tax_id}_Q1-2026.csv`, csv);
    let rows = incomes.map((t, i) =>
        `<tr><td class="center">${i + 1}</td><td class="center">${fmtDate(t.tx_date)}</td><td class="center">${t.has_invoice ? "HĐ" : ""}</td><td>${t.description}</td><td class="num">${fmt(t.amount)}</td></tr>`
    ).join("");
    rows += `<tr class="total-row"><td colspan="4" style="text-align:right">Cộng kỳ:</td><td class="num">${fmt(total)}</td></tr>`;
    openPrintHTML("S1a-HKD — Sổ doanh thu bán hàng", `
    <table><thead><tr><th style="width:40px">STT</th><th style="width:100px">Ngày tháng</th><th style="width:80px">Số CT</th><th>Diễn giải</th><th style="width:140px">Doanh thu (VNĐ)</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="note">Ghi chú: Sổ này dùng cho HKD doanh thu ≤ 500 triệu/năm, không chịu thuế GTGT, không nộp thuế TNCN.</p>`, business, { mauSo: "S1a-HKD", soTitle: "SỔ DOANH THU BÁN HÀNG HÓA, DỊCH VỤ", kyKhai: "Quý 1/2026" });
}

export function exportS2b(transactions: Transaction[], business: BusinessConfig) {
    const incomes = transactions.filter(t => t.type === "income").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const grouped: any = {};
    VAT_GROUPS.forEach(g => { grouped[g.id] = { group: g, txs: [], revenue: 0, vat: 0 }; });
    incomes.forEach(t => { const gid = t.vat_group || business.default_vat_group; if (grouped[gid]) { grouped[gid].txs.push(t); grouped[gid].revenue += t.amount; grouped[gid].vat += Math.round(t.amount * grouped[gid].group.rate); } });
    let csv = "Số CT (A),Ngày tháng (B),Diễn giải (C),Doanh thu (1),Tỷ lệ VAT,VAT phải nộp\n";
    let totalRev = 0, totalVat = 0;
    Object.values(grouped).filter((g: any) => g.revenue > 0).forEach((g: any) => {
        csv += `,,--- Nhóm: ${g.group.label} (VAT ${g.group.rateLabel}) ---,,,\n`;
        g.txs.forEach((t: any) => {
            const vat = Math.round(t.amount * g.group.rate);
            csv += `${t.has_invoice ? "HĐ" : ""},${fmtDate(t.tx_date)},${t.description},${t.amount},${g.group.rateLabel},${vat}\n`;
        });
        csv += `,,Cộng nhóm ${g.group.label},${g.revenue},,${g.vat}\n`;
        totalRev += g.revenue; totalVat += g.vat;
    });
    csv += `\n,,TỔNG CỘNG,${totalRev},,${totalVat}\n`;
    downloadCSV(`S2b-HKD_${business.tax_id}_Q1-2026.csv`, csv);
    let htmlRows = "";
    Object.values(grouped).filter((g: any) => g.revenue > 0).forEach((g: any) => {
        htmlRows += `<tr style="background:#f5f5f5"><td colspan="6" style="font-weight:bold;border:1px solid #000;padding:6px 8px">Nhóm ngành: ${g.group.icon} ${g.group.label} — Tỷ lệ VAT: ${g.group.rateLabel}</td></tr>`;
        g.txs.forEach((t: any) => {
            const vat = Math.round(t.amount * g.group.rate);
            htmlRows += `<tr><td class="center">${t.has_invoice ? "HĐ" : ""}</td><td class="center">${fmtDate(t.tx_date)}</td><td>${t.description}</td><td class="num">${fmt(t.amount)}</td><td class="center">${g.group.rateLabel}</td><td class="num">${fmt(vat)}</td></tr>`;
        });
        htmlRows += `<tr class="total-row"><td colspan="3" style="text-align:right">Cộng nhóm:</td><td class="num">${fmt(g.revenue)}</td><td></td><td class="num">${fmt(g.vat)}</td></tr>`;
    });
    htmlRows += `<tr class="total-row" style="background:#e8e8e8"><td colspan="3" style="text-align:right;font-weight:bold">TỔNG CỘNG:</td><td class="num">${fmt(totalRev)}</td><td></td><td class="num">${fmt(totalVat)}</td></tr>`;
    openPrintHTML("S2b-HKD — Sổ doanh thu theo nhóm VAT", `
    <table><thead><tr><th style="width:60px">Số CT (A)</th><th style="width:90px">Ngày (B)</th><th>Diễn giải (C)</th><th style="width:130px">Doanh thu (1)</th><th style="width:70px">Tỷ lệ %</th><th style="width:130px">VAT phải nộp</th></tr></thead><tbody>${htmlRows}</tbody></table>`, business, { mauSo: "S2b-HKD", soTitle: "SỔ DOANH THU BÁN HÀNG HÓA, DỊCH VỤ<br><span style='font-size:14px;font-weight:normal;font-style:italic'>Theo nhóm ngành nghề có cùng tỷ lệ % tính thuế GTGT</span>", kyKhai: "Quý 1/2026" });
}

export function exportS2c(transactions: Transaction[], business: BusinessConfig, expenseCategories: any[]) {
    const incomes = transactions.filter(t => t.type === "income").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const expenses = transactions.filter(t => t.type === "expense").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const revenue = incomes.reduce((s, t) => s + t.amount, 0);
    const deductibleTxs = expenses.filter(t => t.has_invoice);
    const deductible = deductibleTxs.reduce((s, t) => s + t.amount, 0);
    const nondeductible = expenses.filter(t => !t.has_invoice).reduce((s, t) => s + t.amount, 0);
    const profit = revenue - deductible;
    const catLookup: any = {};
    (expenseCategories || []).forEach(c => { if (c.s2c_group) catLookup[c.id] = c.s2c_group; });
    const groups = S2C_GROUPS.map(g => {
        const txs = deductibleTxs.filter(t => catLookup[t.category_id] === g.code);
        return { ...g, txs, total: txs.reduce((s, t) => s + t.amount, 0) };
    });
    const unclassified = deductibleTxs.filter(t => !catLookup[t.category_id]);
    if (unclassified.length > 0) {
        const eg = groups.find(g => g.code === "e");
        if (eg) { eg.txs = [...eg.txs, ...unclassified]; eg.total += unclassified.reduce((s, t) => s + t.amount, 0); }
    }
    let csv = "STT,Chỉ tiêu,Số tiền (VNĐ),Ghi chú\n";
    csv += `1,Tổng doanh thu bán hàng hóa dịch vụ,${revenue},${incomes.length} giao dịch\n`;
    csv += `2,Tổng chi phí hợp lý (có hóa đơn),${deductible},\n`;
    groups.forEach(g => {
        if (g.total > 0) csv += `,  ${g.code}) ${g.shortLabel},${g.total},${g.txs.length} giao dịch\n`;
    });
    csv += `3,Chi phí không hợp lệ (không HĐ),${nondeductible},\n`;
    csv += `4,Thu nhập tính thuế (1 - 2),${profit},\n`;
    downloadCSV(`S2c-HKD_${business.tax_id}_Q1-2026.csv`, csv);
    let expRows = "";
    groups.forEach(g => {
        const hasData = g.total > 0;
        expRows += `<tr style="background:${g.bg}"><td class="center" style="font-weight:bold">${g.code})</td>
      <td style="font-weight:600;font-size:11px">${g.label}</td>
      <td class="num" style="font-weight:bold">${hasData ? fmt(g.total) : "—"}</td>
      <td style="font-size:11px;color:#666">${hasData ? g.txs.length + " GD" : ""}</td></tr>`;
        if (hasData) {
            g.txs.forEach(t => {
                expRows += `<tr><td></td><td style="padding-left:24px;font-size:11px">${fmtDate(t.tx_date)} — ${t.description}${t.counterparty ? " (" + t.counterparty + ")" : ""}</td><td class="num" style="font-size:11px">${fmt(t.amount)}</td><td class="center" style="font-size:11px">${t.has_invoice ? "HĐ" : ""}</td></tr>`;
            });
        }
    });
    openPrintHTML("S2c-HKD — Sổ chi tiết doanh thu, chi phí", `
    <table><thead><tr><th style="width:40px">STT</th><th>Chỉ tiêu</th><th style="width:150px">Số tiền (VNĐ)</th><th style="width:100px">Ghi chú</th></tr></thead><tbody>
    <tr style="background:#edfaf3"><td class="center" style="font-weight:bold">1</td><td style="font-weight:bold">Doanh thu bán hàng hóa, dịch vụ</td><td class="num" style="font-weight:bold">${fmt(revenue)}</td><td style="font-size:11px">${incomes.length} GD</td></tr>
    ${incomes.map(t => `<tr><td></td><td style="padding-left:20px;font-size:11px">${fmtDate(t.tx_date)} — ${t.description}</td><td class="num" style="font-size:11px">${fmt(t.amount)}</td><td></td></tr>`).join("")}
    <tr style="background:#fff0f0"><td class="center" style="font-weight:bold">2</td><td style="font-weight:bold">Chi phí hợp lý được khấu trừ</td><td class="num" style="font-weight:bold">${fmt(deductible)}</td><td style="font-size:11px">Có HĐ/CT</td></tr>
    ${expRows}
    <tr style="background:#fff5f5"><td class="center">3</td><td>Chi phí không hợp lệ (không có hóa đơn, chứng từ)</td><td class="num" style="color:red">${fmt(nondeductible)}</td><td style="font-size:11px">Không khấu trừ</td></tr>
    <tr class="total-row" style="background:#f0f0f5"><td class="center" style="font-weight:bold">4</td><td style="font-weight:bold">Chênh lệch thu chi = (1) − (2)</td><td class="num" style="font-weight:bold">${fmt(profit)}</td><td style="font-size:11px">Căn cứ tính PIT</td></tr>
    </tbody></table>
    <p class="note">Hộ kinh doanh tính chênh lệch giữa tổng doanh thu và tổng chi phí hợp lý để làm căn cứ tính thuế TNCN phải nộp theo quy định tại TT152/2025/TT-BTC.</p>`, business, { mauSo: "S2c-HKD", soTitle: "SỔ CHI TIẾT DOANH THU, CHI PHÍ", kyKhai: "Quý 1/2026" });
}

export function exportS2d(inventory: InventoryItem[], business: BusinessConfig) {
    let csv = "Tên hàng hóa,Số CT (A),Ngày (B),Diễn giải (C),ĐVT (D),Đơn giá (1),SL nhập (2),Thành tiền nhập (3),SL xuất (4),Thành tiền xuất (5),SL tồn (6),Thành tiền tồn (7)\n";
    let htmlGroups = "";
    inventory.forEach(item => {
        const { rows, endQty, endVal } = calcInventory(item);
        csv += `${item.name},,Tồn đầu kỳ,,${item.unit},${item.opening_qty > 0 ? Math.round(item.opening_value / item.opening_qty) : 0},,,,,${item.opening_qty},${item.opening_value}\n`;
        rows.forEach(r => {
            csv += `,${r.doc},${fmtDate(r.date)},${r.desc},${item.unit},${r.unitPrice},${r.inQty || ""},${r.inVal || ""},${r.outQty || ""},${r.outVal || ""},${r.stockQty},${r.stockVal}\n`;
        });
        csv += `,,Cộng kỳ,,,,${rows.reduce((s, r) => s + r.inQty, 0)},${rows.reduce((s, r) => s + r.inVal, 0)},${rows.reduce((s, r) => s + r.outQty, 0)},${rows.reduce((s, r) => s + r.outVal, 0)},${endQty},${endVal}\n\n`;
        let trs = `<tr style="background:#f5f5f5;font-weight:bold"><td colspan="2">Tồn đầu kỳ</td><td></td><td class="center">${item.unit}</td><td class="num">${item.opening_qty > 0 ? fmt(Math.round(item.opening_value / item.opening_qty)) : ""}</td><td></td><td></td><td></td><td></td><td class="num">${item.opening_qty}</td><td class="num">${fmt(item.opening_value)}</td></tr>`;
        rows.forEach(r => {
            trs += `<tr><td class="center">${r.doc}</td><td class="center">${fmtDate(r.date)}</td><td>${r.desc}</td><td class="center">${item.unit}</td><td class="num">${fmt(r.unitPrice)}</td>
      <td class="num">${r.inQty || ""}</td><td class="num">${r.inVal ? fmt(r.inVal) : ""}</td><td class="num">${r.outQty || ""}</td><td class="num">${r.outVal ? fmt(r.outVal) : ""}</td><td class="num">${r.stockQty}</td><td class="num">${fmt(r.stockVal)}</td></tr>`;
        });
        trs += `<tr class="total-row"><td colspan="4" style="text-align:right">Cộng kỳ / Tồn cuối kỳ:</td><td></td><td class="num">${rows.reduce((s, r) => s + r.inQty, 0)}</td><td class="num">${fmt(rows.reduce((s, r) => s + r.inVal, 0))}</td><td class="num">${rows.reduce((s, r) => s + r.outQty, 0)}</td><td class="num">${fmt(rows.reduce((s, r) => s + r.outVal, 0))}</td><td class="num">${endQty}</td><td class="num">${fmt(endVal)}</td></tr>`;
        htmlGroups += `<h3 style="text-align:left;margin-top:20px">Tên hàng hóa: <strong>${item.name}</strong> — ĐVT: ${item.unit}</h3>
    <table style="font-size:11px"><thead><tr><th>Số CT (A)</th><th>Ngày (B)</th><th>Diễn giải (C)</th><th>ĐVT (D)</th><th>Đ.giá (1)</th><th>SL nhập (2)</th><th>T.tiền (3)</th><th>SL xuất (4)</th><th>T.tiền (5)</th><th>SL tồn (6)</th><th>T.tiền (7)</th></tr></thead><tbody>${trs}</tbody></table>`;
    });
    downloadCSV(`S2d-HKD_${business.tax_id}_Q1-2026.csv`, csv);
    openPrintHTML("S2d-HKD — Sổ chi tiết vật liệu, hàng hóa", `
    <p class="note">Phương pháp: Đơn giá xuất kho bình quân = (Giá trị tồn đầu kỳ + Giá trị nhập trong kỳ) / (SL tồn đầu kỳ + SL nhập trong kỳ)</p>
    ${htmlGroups}`, business, { mauSo: "S2d-HKD", soTitle: "SỔ CHI TIẾT VẬT LIỆU, DỤNG CỤ, SẢN PHẨM, HÀNG HÓA", kyKhai: "Quý 1/2026" });
}

export function exportS2e(transactions: Transaction[], business: BusinessConfig) {
    const cashTx = transactions.filter(t => t.payment_method === "cash").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    const bankTx = transactions.filter(t => t.payment_method === "bank_transfer").sort((a, b) => a.tx_date.localeCompare(b.tx_date));
    function buildSection(label: string, txs: Transaction[], openBal: number) {
        let bal = openBal, csvPart = "", htmlPart = "";
        csvPart += `\n--- ${label} ---\n`;
        csvPart += `Số CT (A),Ngày (B),Diễn giải (C),Thu/Gửi vào (1),Chi/Rút ra (2),Tồn/Dư\n`;
        csvPart += `,,,,,${openBal}\n`;
        htmlPart += `<tr style="background:#f5f5f5"><td colspan="5" style="font-weight:bold">${label} — Số dư đầu kỳ:</td><td class="num" style="font-weight:bold">${fmt(openBal)}</td></tr>`;
        txs.forEach(t => {
            const inAmt = t.type === "income" ? t.amount : 0;
            const outAmt = t.type === "expense" ? t.amount : 0;
            bal += inAmt - outAmt;
            csvPart += `${t.has_invoice ? "HĐ" : ""},${fmtDate(t.tx_date)},${t.description},${inAmt || ""},${outAmt || ""},${bal}\n`;
            htmlPart += `<tr><td class="center">${t.has_invoice ? "HĐ" : ""}</td><td class="center">${fmtDate(t.tx_date)}</td><td>${t.description}</td><td class="num">${inAmt ? fmt(inAmt) : ""}</td><td class="num">${outAmt ? fmt(outAmt) : ""}</td><td class="num">${fmt(bal)}</td></tr>`;
        });
        csvPart += `,,Tồn cuối kỳ,,,${bal}\n`;
        htmlPart += `<tr class="total-row"><td colspan="5" style="text-align:right">Tồn / Dư cuối kỳ:</td><td class="num">${fmt(bal)}</td></tr>`;
        return { csvPart, htmlPart, endBal: bal };
    }
    const cash = buildSection("TIỀN MẶT", cashTx, business.cash_balance);
    const bank = buildSection("TIỀN GỬI NGÂN HÀNG", bankTx, business.bank_balance);
    let csv = "SỔ CHI TIẾT TIỀN — S2e-HKD\nSố CT (A),Ngày (B),Diễn giải (C),Thu/Gửi vào (1),Chi/Rút ra (2),Tồn/Dư\n";
    csv += cash.csvPart + bank.csvPart;
    downloadCSV(`S2e-HKD_${business.tax_id}_Q1-2026.csv`, csv);
    openPrintHTML("S2e-HKD — Sổ chi tiết tiền", `
    <table><thead><tr><th style="width:60px">Số CT (A)</th><th style="width:90px">Ngày (B)</th><th>Diễn giải (C)</th><th style="width:120px">Thu/Gửi vào (1)</th><th style="width:120px">Chi/Rút ra (2)</th><th style="width:120px">Tồn/Dư</th></tr></thead><tbody>
    ${cash.htmlPart}${bank.htmlPart}
    </tbody></table>`, business, { mauSo: "S2e-HKD", soTitle: "SỔ CHI TIẾT TIỀN", kyKhai: "Quý 1/2026" });
}
