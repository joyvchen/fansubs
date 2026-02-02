'use client';

import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  icon?: React.ReactNode;
}

export function StatCard({ label, value, subValue, trend, trendValue, icon }: StatCardProps) {
  const trendColors = {
    up: 'text-[#1ed760]',
    down: 'text-[#e91429]',
    neutral: 'text-[#a7a7a7]',
  };

  const trendIcons = {
    up: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 14l5-5 5 5H7z" />
      </svg>
    ),
    down: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7 10l5 5 5-5H7z" />
      </svg>
    ),
    neutral: null,
  };

  return (
    <div className="bg-[#181818] rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <span className="text-[#a7a7a7] text-sm">{label}</span>
        {icon && <span className="text-[#a7a7a7]">{icon}</span>}
      </div>

      <div className="flex items-end gap-2">
        <span className="text-white font-bold text-3xl">{value}</span>
        {subValue && <span className="text-[#a7a7a7] text-sm mb-1">{subValue}</span>}
      </div>

      {trend && trendValue && (
        <div className={`flex items-center gap-1 mt-2 ${trendColors[trend]}`}>
          {trendIcons[trend]}
          <span className="text-sm">{trendValue}</span>
        </div>
      )}
    </div>
  );
}
