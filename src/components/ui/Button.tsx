'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-full transition-all duration-200 inline-flex items-center justify-center';

  const variants = {
    primary: 'bg-[#1ED760] text-black hover:bg-[#1fdf64] hover:scale-105 active:scale-100',
    secondary: 'bg-[#282828] text-white hover:bg-[#3e3e3e] hover:scale-105 active:scale-100',
    text: 'bg-transparent text-white hover:text-[#1ED760]',
    outline: 'bg-transparent text-white border border-[#535353] hover:border-white hover:scale-105 active:scale-100',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : 'cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabledStyles} ${widthStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
