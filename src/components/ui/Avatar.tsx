'use client';

import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  rounded?: boolean;
  className?: string;
}

export function Avatar({
  src,
  alt,
  size = 'md',
  rounded = false,
  className = '',
}: AvatarProps) {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    '2xl': 'w-32 h-32',
  };

  const roundedStyles = rounded ? 'rounded-full' : 'rounded-md';

  // Generate a background color based on the alt text for placeholder
  const getPlaceholderColor = () => {
    const colors = [
      'bg-[#1ed760]',
      'bg-[#509bf5]',
      'bg-[#e91429]',
      'bg-[#f59b23]',
      'bg-[#af2896]',
      'bg-[#148a08]',
    ];
    const index = alt.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (!src) {
    return (
      <div
        className={`${sizes[size]} ${roundedStyles} ${getPlaceholderColor()} flex items-center justify-center ${className}`}
      >
        <span className="text-white font-bold text-sm">
          {alt.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${sizes[size]} ${roundedStyles} overflow-hidden bg-[#282828] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          // On error, show placeholder
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          target.parentElement!.classList.add(getPlaceholderColor());
          target.parentElement!.innerHTML = `<span class="text-white font-bold text-sm flex items-center justify-center w-full h-full">${alt.charAt(0).toUpperCase()}</span>`;
        }}
      />
    </div>
  );
}
