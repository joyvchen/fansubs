'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
}

const HomeIcon = ({ active }: { active?: boolean }) => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
    {active && <path d="M9 22V12h6v10" fill="#121212" />}
  </svg>
);

const SearchIcon = ({ active }: { active?: boolean }) => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.5 : 2}>
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const LibraryIcon = ({ active }: { active?: boolean }) => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? 0 : 2}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
    {!active && <path d="M8 6h8M8 10h8M8 14h4" />}
  </svg>
);

const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '/listener/home',
    icon: <HomeIcon />,
    activeIcon: <HomeIcon active />,
  },
  {
    label: 'Search',
    href: '/listener/search',
    icon: <SearchIcon />,
    activeIcon: <SearchIcon active />,
  },
  {
    label: 'Your Library',
    href: '/listener/library',
    icon: <LibraryIcon />,
    activeIcon: <LibraryIcon active />,
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] bg-gradient-to-t from-black via-black/95 to-transparent pt-6 pb-4 px-5 z-50">
      <div className="flex justify-around items-center bg-[#181818] rounded-lg py-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href.split('/').slice(0, 3).join('/'));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-6 py-3 transition-colors ${
                isActive ? 'text-white' : 'text-[#a7a7a7] hover:text-white'
              }`}
            >
              {isActive ? item.activeIcon : item.icon}
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
