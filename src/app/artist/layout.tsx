'use client';

import React from 'react';
import { Sidebar } from '@/components/ui';
import { useApp } from '@/context/AppContext';

export default function ArtistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setMode } = useApp();

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        {/* Top Bar */}
        <div className="sticky top-0 bg-[#121212]/95 backdrop-blur-sm z-10 px-8 py-4 flex items-center justify-end gap-4 border-b border-[#282828]">
          <button
            onClick={() => setMode('listener')}
            className="px-4 py-2 text-sm text-[#a7a7a7] hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Switch to Listener
          </button>
          <div className="w-8 h-8 rounded-full bg-[#282828] flex items-center justify-center text-white text-sm font-bold">
            A
          </div>
        </div>
        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
