
import React from 'react';

interface Props {
  flowType: 'rich' | 'poor' | 'middle';
}

const CashFlowDiagram: React.FC<Props> = ({ flowType }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[600px] border-4 border-slate-200 rounded-3xl bg-white p-8 shadow-inner overflow-hidden">
      {/* Income Statement Box */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-48 border-2 border-slate-800 flex flex-col z-10 bg-white">
        <div className="p-2 border-b-2 border-slate-800 font-bold bg-slate-50 text-center uppercase tracking-wider">
          Báo Cáo Thu Nhập
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-2 border-b-2 border-slate-800">
            <span className="font-semibold block mb-1">Thu nhập</span>
            <div className="text-xs text-slate-400 italic">Lương, Thặng dư tài sản...</div>
          </div>
          <div className="flex-1 p-2 bg-slate-50">
            <span className="font-semibold block mb-1">Chi phí</span>
            <div className="text-xs text-slate-400 italic">Thuế, Nợ, Ăn uống...</div>
          </div>
        </div>
      </div>

      {/* Balance Sheet Box */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-56 border-2 border-slate-800 flex flex-col z-10 bg-white">
        <div className="p-2 border-b-2 border-slate-800 font-bold bg-slate-50 text-center uppercase tracking-wider">
          Bảng Cân Đối Thu Chi
        </div>
        <div className="flex-1 flex">
          <div className="flex-1 p-2 border-r-2 border-slate-800">
            <span className="font-semibold block mb-1">Tài sản</span>
            <div className="text-[10px] leading-tight text-slate-500">
              (Thứ bỏ tiền vào túi bạn)
              <ul className="mt-1 list-disc list-inside">
                <li>Digital Assets</li>
                <li>Bất động sản</li>
                <li>Cổ phiếu</li>
              </ul>
            </div>
          </div>
          <div className="flex-1 p-2 bg-slate-50">
            <span className="font-semibold block mb-1">Tiêu sản</span>
             <div className="text-[10px] leading-tight text-slate-500">
              (Thứ rút tiền khỏi túi bạn)
              <ul className="mt-1 list-disc list-inside">
                <li>Nợ thẻ tín dụng</li>
                <li>Vay tiêu dùng</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Arrows SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#2563eb" />
          </marker>
          <marker id="arrowhead-red" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#dc2626" />
          </marker>
        </defs>
        
        {/* The Rich Flow: Asset -> Income */}
        <path 
          d="M 400 450 Q 320 400 350 250 Q 380 150 440 100" 
          stroke="#2563eb" 
          strokeWidth="4" 
          fill="none" 
          markerEnd="url(#arrowhead)"
          className={`transition-opacity duration-500 ${flowType === 'rich' ? 'opacity-100' : 'opacity-10'}`}
          strokeDasharray="10 5"
        >
          <animate attributeName="stroke-dashoffset" from="150" to="0" dur="3s" repeatCount="indefinite" />
        </path>

        {/* The Poor Flow: Income -> Expense -> Out */}
        <path 
          d="M 440 70 Q 550 100 550 180 L 650 180" 
          stroke="#dc2626" 
          strokeWidth="4" 
          fill="none" 
          markerEnd="url(#arrowhead-red)"
          className={`transition-opacity duration-500 ${flowType === 'poor' ? 'opacity-100' : 'opacity-10'}`}
        />

        {/* Middle Class Flow: Income -> Liability -> Expense -> Out */}
        <path 
          d="M 440 70 Q 600 150 600 450 Q 550 500 550 180 L 650 180" 
          stroke="#f59e0b" 
          strokeWidth="4" 
          fill="none" 
          markerEnd="url(#arrowhead)"
          className={`transition-opacity duration-500 ${flowType === 'middle' ? 'opacity-100' : 'opacity-10'}`}
        />
      </svg>

      {/* Legend Labels */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        <div className={`flex items-center gap-2 text-sm font-bold p-2 rounded ${flowType === 'rich' ? 'bg-blue-100 text-blue-800' : 'text-slate-400'}`}>
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div> Luồng Tiền Người Giàu
        </div>
        <div className={`flex items-center gap-2 text-sm font-bold p-2 rounded ${flowType === 'poor' ? 'bg-red-100 text-red-800' : 'text-slate-400'}`}>
          <div className="w-3 h-3 bg-red-600 rounded-full"></div> Luồng Tiền Người Nghèo
        </div>
        <div className={`flex items-center gap-2 text-sm font-bold p-2 rounded ${flowType === 'middle' ? 'bg-amber-100 text-amber-800' : 'text-slate-400'}`}>
          <div className="w-3 h-3 bg-amber-600 rounded-full"></div> Luồng Tiền Trung Lưu
        </div>
      </div>
    </div>
  );
};

export default CashFlowDiagram;
