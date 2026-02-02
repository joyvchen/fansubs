'use client';

import React from 'react';

interface FeatureListProps {
  features: string[];
  variant?: 'default' | 'compact';
}

export function FeatureList({ features, variant = 'default' }: FeatureListProps) {
  const checkIcon = (
    <svg className="w-5 h-5 text-[#1ed760] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
    </svg>
  );

  if (variant === 'compact') {
    return (
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-[#a7a7a7] text-sm">
            {checkIcon}
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3 text-white">
          {checkIcon}
          <span className="text-sm">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
