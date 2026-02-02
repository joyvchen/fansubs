'use client';

import React from 'react';
import { ExclusiveContent } from '@/types';
import { ContentPreviewCard } from '@/components/ui/ContentPreviewCard';
import { Button } from '@/components/ui';

interface LockedContentSectionProps {
  content: ExclusiveContent[];
  onSubscribe: () => void;
}

export function LockedContentSection({ content, onSubscribe }: LockedContentSectionProps) {
  if (content.length === 0) return null;

  return (
    <section className="relative">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#1ed760]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
          </svg>
          <h2 className="text-white font-bold text-lg">Subscriber Exclusives</h2>
        </div>
      </div>

      {/* Content Grid with Blur */}
      <div className="relative">
        <div className="grid grid-cols-2 gap-3">
          {content.slice(0, 4).map((item) => (
            <ContentPreviewCard key={item.id} content={item} locked />
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent flex flex-col items-center justify-end pb-6">
          <p className="text-white font-semibold mb-2">Subscribe to unlock</p>
          <p className="text-[#a7a7a7] text-sm mb-4 text-center px-4">
            Get access to exclusive content from this artist
          </p>
          <Button variant="primary" onClick={onSubscribe}>
            View Subscription Options
          </Button>
        </div>
      </div>
    </section>
  );
}
