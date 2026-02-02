'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const HomeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33z" />
  </svg>
);

const MusicIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 3h15v15.167a3.5 3.5 0 1 1-3.5-3.5H19V5H8v13.167a3.5 3.5 0 1 1-3.5-3.5H6V3z" />
  </svg>
);

const AudienceIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-10C8.13 4 5 7.13 5 11c0 2.38 1.19 4.47 3 5.74V19c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" />
    <path d="M17 18c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zM3 18c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" />
  </svg>
);

const MoneyIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
  </svg>
);

const SubscriptionsIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
    <path d="M12 5.5v9l6-4.5z" />
  </svg>
);

const ProfileIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
  </svg>
);

const sections = [
  {
    title: null,
    items: [
      { label: 'Home', href: '/artist/dashboard', icon: <HomeIcon /> },
      { label: 'Music', href: '/artist/music', icon: <MusicIcon /> },
      { label: 'Audience', href: '/artist/audience', icon: <AudienceIcon /> },
    ] as SidebarItem[],
  },
  {
    title: 'Monetization',
    items: [
      { label: 'Fan Subscriptions', href: '/artist/subscriptions', icon: <SubscriptionsIcon /> },
    ] as SidebarItem[],
  },
  {
    title: null,
    items: [
      { label: 'Profile', href: '/artist/profile', icon: <ProfileIcon /> },
    ] as SidebarItem[],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentArtist } = useApp();

  return (
    <aside className="dashboard-sidebar flex flex-col">
      {/* Logo */}
      <div className="p-8">
        <div className="flex items-center gap-2">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span className="text-white font-bold">for Artists</span>
        </div>
      </div>

      {/* Artist Selector */}
      {currentArtist && (
        <div className="px-5 mb-5">
          <div className="flex items-center gap-4 p-4 rounded-md hover:bg-[#282828] cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1ed760] to-[#509bf5] flex items-center justify-center text-black font-bold">
              {currentArtist.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{currentArtist.name}</p>
              <p className="text-[#a7a7a7] text-xs">Artist</p>
            </div>
            <svg className="w-4 h-4 text-[#a7a7a7]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-4">
            {section.title && (
              <h3 className="px-4 py-2 text-[11px] font-bold text-[#a7a7a7] uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-4 px-5 py-3 rounded-md transition-colors ${
                        isActive
                          ? 'bg-[#282828] text-white'
                          : 'text-[#a7a7a7] hover:text-white hover:bg-[#1a1a1a]'
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
