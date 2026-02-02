'use client';

import React from 'react';

interface RevenueChartProps {
  data: { month: string; revenue: number }[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const minRevenue = Math.min(...data.map((d) => d.revenue));
  const range = maxRevenue - minRevenue;

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  return (
    <div className="bg-[#181818] rounded-xl p-6">
      <h3 className="text-white font-bold mb-5">Revenue Over Time</h3>

      {/* Chart */}
      <div className="h-48 flex items-end gap-3">
        {data.map((item, index) => {
          const height = range > 0
            ? ((item.revenue - minRevenue) / range) * 100 + 20
            : 50;

          return (
            <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex justify-center group">
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#282828] px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {formatCurrency(item.revenue)}
                </div>
                {/* Bar */}
                <div
                  className="w-full max-w-8 rounded-t bg-gradient-to-t from-[#1ed760] to-[#1ed760]/60 transition-all hover:from-[#1fdf64] hover:to-[#1fdf64]/60"
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-[#a7a7a7] text-[10px] truncate w-full text-center">
                {item.month.split(' ')[0].slice(0, 3)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-between mt-5 pt-5 border-t border-[#282828]">
        <div>
          <p className="text-[#a7a7a7] text-xs">Lowest</p>
          <p className="text-white font-semibold">{formatCurrency(minRevenue)}</p>
        </div>
        <div className="text-right">
          <p className="text-[#a7a7a7] text-xs">Highest</p>
          <p className="text-white font-semibold">{formatCurrency(maxRevenue)}</p>
        </div>
      </div>
    </div>
  );
}
