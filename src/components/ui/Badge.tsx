'use client';

import React from 'react';

interface BadgeProps {
  variant?: 'subscriber' | 'popular' | 'value' | 'default' | 'verified';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  const variants = {
    subscriber: 'bg-gradient-to-r from-[#1ed760] to-[#1db954] text-black text-[10px] font-bold px-5 py-2 uppercase tracking-wider',
    popular: 'bg-gradient-to-r from-[#1ed760] to-[#1db954] text-black text-[10px] font-bold px-5 py-2 uppercase tracking-wider',
    value: 'bg-gradient-to-r from-[#ffa42b] to-[#ff8c00] text-black text-[10px] font-bold px-5 py-2 uppercase tracking-wider',
    default: 'bg-[#282828] text-white text-[10px] font-bold px-5 py-2 uppercase tracking-wider',
    verified: 'bg-[#509bf5] text-white text-[10px] font-bold px-5 py-2',
  };

  return (
    <span className={`inline-flex items-center rounded ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function VerifiedBadge({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`w-5 h-5 text-[#509bf5] ${className}`}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M10.814.5a1.658 1.658 0 0 1 2.372 0l1.286 1.31a1.658 1.658 0 0 0 1.469.51l1.826-.27a1.658 1.658 0 0 1 1.876 1.371l.252 1.83a1.658 1.658 0 0 0 .978 1.235l1.667.764a1.658 1.658 0 0 1 .732 2.254l-.878 1.628a1.658 1.658 0 0 0 0 1.57l.878 1.628a1.658 1.658 0 0 1-.732 2.254l-1.667.764a1.658 1.658 0 0 0-.978 1.235l-.252 1.83a1.658 1.658 0 0 1-1.876 1.371l-1.826-.27a1.658 1.658 0 0 0-1.469.51l-1.286 1.31a1.658 1.658 0 0 1-2.372 0l-1.286-1.31a1.658 1.658 0 0 0-1.469-.51l-1.826.27a1.658 1.658 0 0 1-1.876-1.371l-.252-1.83a1.658 1.658 0 0 0-.978-1.235l-1.667-.764a1.658 1.658 0 0 1-.732-2.254l.878-1.628a1.658 1.658 0 0 0 0-1.57l-.878-1.628a1.658 1.658 0 0 1 .732-2.254l1.667-.764a1.658 1.658 0 0 0 .978-1.235l.252-1.83A1.658 1.658 0 0 1 6.233 2.05l1.826.27a1.658 1.658 0 0 0 1.469-.51L10.814.5z" />
      <path
        d="m8 12.5 2.5 2.5L16 9"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
