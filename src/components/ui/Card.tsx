'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  className = '',
  hoverable = false,
  onClick,
  padding = 'md',
}: CardProps) {
  const paddings = {
    none: '',
    sm: 'p-5',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hoverable
    ? 'cursor-pointer transition-all duration-200 hover:bg-[#282828]'
    : '';

  return (
    <div
      className={`bg-[#181818] rounded-lg ${paddings[padding]} ${hoverStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
}
