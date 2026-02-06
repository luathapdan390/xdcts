
import React, { useState, useMemo, useEffect } from 'react';
import { 
  BarChart3, 
  LayoutDashboard, 
  Info, 
  RefreshCw,
  Wallet,
  ArrowRightLeft,
  Settings,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { 
  INITIAL_ASSETS, 
  INITIAL_LIABILITIES, 
  INITIAL_EXPENSES 
} from './constants';
import { FinancialItem, Category } from './types';
import CashFlowDiagram from './components/CashFlowDiagram';
import FinancialCard from './components/FinancialCard';

const App: React.FC = () => {
  const [assets, setAssets] = useState<FinancialItem[]>(INITIAL_ASSETS);
  const [liabilities, setLiabilities] = useState<FinancialItem[]>(INITIAL_LIABILITIES);
  const [expenses, setExpenses] = useState<FinancialItem[]>(INITIAL_EXPENSES);
  
  // Khởi tạo thu nhập từ 10% giá trị tài sản ban đầu
  const [incomes, setIncomes] = useState<FinancialItem[]>(() => 
    INITIAL_ASSETS.map(asset => ({
      id: `inc-${asset.id}`,
      name: `LN từ ${asset.name}`,
      value: Math.floor(asset.value * 0.1),
      category: Category.INCOME,
    }))
  );

  const [flowType, setFlowType] = useState<'rich' | 'poor' | 'middle'>('rich');

  // Hàm cập nhật chung cho tất cả các loại mục tài chính
  const updateItemValue = (id: string, newValue: number, category: Category) => {
    switch (category) {
      case Category.ASSET:
        setAssets(prev => prev.map(item => item.id === id ? { ...item, value: newValue } : item));
        break;
      case Category.LIABILITY:
        setLiabilities(prev => prev.map(item => item.id === id ? { ...item, value: newValue } : item));
        break;
      case Category.EXPENSE:
        setExpenses(prev => prev.map(item => item.id === id ? { ...item, value: newValue } : item));
        break;
      case Category.INCOME:
        setIncomes(prev => prev.map(item => item.id === id ? { ...item, value: newValue } : item));
        break;
    }
  };

  const totalIncome = incomes.reduce((s, c) => s + c.value, 0);
  const totalExpenses = expenses.reduce((s, c) => s + c.value, 0);
  const netCashflow = totalIncome - totalExpenses;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-slate-50">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-slate-900 text-slate-300 flex flex-col p-6 gap-8">
        <div className="flex items-center gap-3 text-white">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-none">Cashflow</h1>
            <span className="text-blue-400 text-[10px] uppercase font-bold tracking-widest">Rich Dad Method</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-blue-600/10 text-blue-400 font-semibold border border-blue-600/20 transition-all">
            <LayoutDashboard className="w-5 h-5" /> Bảng Điều Khiển
          </button>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all text-slate-400">
            <ArrowRightLeft className="w-5 h-5" /> Lịch sử
          </button>
          <button className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all text-slate-400">
            <BarChart3 className="w-5 h-5" /> Phân tích
          </button>
        </nav>

        <div className="mt-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs text-blue-400 font-bold uppercase">
            <Info className="w-3 h-3" /> Triết lý Kiyosaki
          </div>
          <p className="text-xs italic leading-relaxed text-slate-400">
            "Người giàu mua tài sản. Người nghèo chỉ có chi phí. Người trung lưu mua tiêu sản mà họ nghĩ là tài sản."
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">CÂN ĐỐI TÀI CHÍNH CÁ NHÂN</h2>
            <p className="text-slate-500 text-sm">Chỉnh sửa các con số trực tiếp để thấy dòng tiền thay đổi</p>
          </div>
          <div className="flex gap-2 bg-slate-100 p-1 rounded-xl shrink-0">
             <button 
              onClick={() => setFlowType('rich')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${flowType === 'rich' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}
            >
              Giàu
            </button>
            <button 
              onClick={() => setFlowType('poor')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${flowType === 'poor' ? 'bg-rose-600 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}
            >
              Nghèo
            </button>
            <button 
              onClick={() => setFlowType('middle')}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${flowType === 'middle' ? 'bg-amber-500 text-white shadow-md' : 'text-slate-500 hover:bg-white'}`}
            >
              Trung Lưu
            </button>
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-emerald-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Tổng Thu Nhập</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-slate-800">{totalIncome.toLocaleString('vi-VN')} đ</p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border-l-4 border-rose-500">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Tổng Chi Phí</span>
              <TrendingDown className="w-4 h-4 text-rose-500" />
            </div>
            <p className="text-2xl font-black text-slate-800">{totalExpenses.toLocaleString('vi-VN')} đ</p>
          </div>
          <div className={`bg-white p-5 rounded-2xl shadow-sm border-l-4 ${netCashflow >= 0 ? 'border-blue-500' : 'border-rose-600 animate-pulse'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Dòng Tiền Hàng Tháng</span>
              <RefreshCw className={`w-4 h-4 ${netCashflow >= 0 ? 'text-blue-500' : 'text-rose-600'}`} />
            </div>
            <p className={`text-2xl font-black ${netCashflow >= 0 ? 'text-blue-600' : 'text-rose-600'}`}>
              {netCashflow.toLocaleString('vi-VN')} đ
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Main Diagram Area */}
          <div className="xl:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-500 animate-spin-slow" /> Minh Họa Luồng Tiền
                </h3>
                <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold uppercase">Tương tác trực tiếp</span>
              </div>
              <CashFlowDiagram flowType={flowType} />
            </div>
            
            <div className="bg-indigo-900 text-white p-6 rounded-3xl shadow-xl overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-2">Mục tiêu Tài Chính: Tự do!</h4>
                <p className="text-indigo-200 text-sm leading-relaxed max-w-md">
                  Khi thu nhập từ <span className="text-white font-bold">Cột Tài Sản</span> lớn hơn <span className="text-white font-bold">Tổng Chi Phí</span>, bạn đã thoát khỏi "Vòng Chuột" (Rat Race).
                </p>
                <div className="mt-4 flex gap-4 items-center">
                  <div className="h-2 flex-1 bg-indigo-950 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-400 transition-all duration-1000" 
                      style={{ width: `${Math.min(100, (totalIncome / (totalExpenses || 1)) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold">{Math.floor((totalIncome / (totalExpenses || 1)) * 100)}% Phủ chi phí</span>
                </div>
              </div>
              <Wallet className="absolute -right-10 -bottom-10 w-48 h-48 text-indigo-800 opacity-20 rotate-12" />
            </div>
          </div>

          {/* Edit Cards Area */}
          <div className="xl:col-span-5 grid grid-cols-1 gap-4 content-start">
            <FinancialCard 
              title="Cột Thu Nhập" 
              items={incomes} 
              variant="income"
              onUpdateValue={(id, val) => updateItemValue(id, val, Category.INCOME)}
            />
            <FinancialCard 
              title="Cột Tài Sản (Digital)" 
              items={assets} 
              variant="asset"
              onUpdateValue={(id, val) => updateItemValue(id, val, Category.ASSET)}
            />
            <FinancialCard 
              title="Cột Chi Phí" 
              items={expenses} 
              variant="expense"
              onUpdateValue={(id, val) => updateItemValue(id, val, Category.EXPENSE)}
            />
            <FinancialCard 
              title="Cột Tiêu Sản" 
              items={liabilities} 
              variant="liability"
              onUpdateValue={(id, val) => updateItemValue(id, val, Category.LIABILITY)}
            />
          </div>
        </div>

        <footer className="mt-12 text-center text-slate-400 text-[10px] uppercase tracking-widest font-bold border-t border-slate-200 pt-8 pb-4">
          Hệ sinh thái Digital: lehongtruong.com • Facebook • TikTok • Zalo • Luật Hấp Dẫn • Gemini AI
        </footer>
      </main>

      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;
