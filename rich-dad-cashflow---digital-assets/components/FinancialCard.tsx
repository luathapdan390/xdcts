
import React from 'react';
import { FinancialItem } from '../types';
import { getIcon } from '../constants';

interface Props {
  title: string;
  items: FinancialItem[];
  variant: 'income' | 'expense' | 'asset' | 'liability';
  onUpdateValue: (id: string, newValue: number) => void;
}

const FinancialCard: React.FC<Props> = ({ title, items, variant, onUpdateValue }) => {
  const total = items.reduce((acc, curr) => acc + curr.value, 0);
  
  const colors = {
    income: 'border-emerald-500 text-emerald-700 bg-emerald-50',
    expense: 'border-rose-500 text-rose-700 bg-rose-50',
    asset: 'border-blue-500 text-blue-700 bg-blue-50',
    liability: 'border-amber-500 text-amber-700 bg-amber-50',
  };

  const handleInputChange = (id: string, val: string) => {
    const numericValue = parseInt(val.replace(/\D/g, '')) || 0;
    onUpdateValue(id, numericValue);
  };

  return (
    <div className={`border-2 rounded-xl overflow-hidden flex flex-col shadow-sm transition-all duration-300 ${colors[variant]}`}>
      <div className="px-4 py-3 font-bold uppercase tracking-wide flex justify-between items-center bg-white/50 border-b border-inherit">
        <span>{title}</span>
        <span className="text-lg">{total.toLocaleString('vi-VN')} đ</span>
      </div>
      <div className="flex-1 p-3 space-y-2 max-h-[400px] overflow-y-auto">
        {items.length === 0 && <p className="text-sm italic opacity-50">Chưa có dữ liệu</p>}
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-100 group hover:border-inherit transition-all">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="shrink-0">{getIcon(item.name)}</div>
              <div className="truncate">
                <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                {item.description && <p className="text-[10px] text-slate-400 truncate">{item.description}</p>}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <input
                type="text"
                value={item.value.toLocaleString('vi-VN')}
                onChange={(e) => handleInputChange(item.id, e.target.value)}
                className="w-24 text-right text-sm font-bold text-slate-700 bg-slate-50 border border-transparent focus:border-inherit focus:ring-0 rounded px-1 transition-all"
              />
              <span className="text-[10px] font-bold opacity-30">đ</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialCard;
