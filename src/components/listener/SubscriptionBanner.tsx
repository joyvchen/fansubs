'use client';

import React from 'react';
import Link from 'next/link';

export function SubscriptionBanner() {
  return (
    <div className="bg-gradient-to-r from-[#1a472a] via-[#1e3a5f] to-[#2d1b4e] rounded-xl p-6 mx-5 my-5">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1ed760] to-[#509bf5] flex items-center justify-center flex-shrink-0">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg">Support your favorite artists</h3>
          <p className="text-[#a7a7a7] text-sm mt-1">
            Subscribe for exclusive content, early releases, and more.
          </p>
        </div>
      </div>
      <Link
        href="/listener/library?tab=subscriptions"
        className="block mt-4 text-center text-[#1ed760] font-semibold text-sm hover:underline"
      >
        Explore Fan Subscriptions →
      </Link>
    </div>
  );
}
