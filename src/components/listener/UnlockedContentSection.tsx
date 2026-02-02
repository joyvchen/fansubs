'use client';

import React, { useState } from 'react';
import { ExclusiveContent } from '@/types';
import { ContentPreviewCard } from '@/components/ui/ContentPreviewCard';
import { Badge } from '@/components/ui';

interface UnlockedContentSectionProps {
  content: ExclusiveContent[];
  tierName: string;
}

type ContentFilter = 'all' | ExclusiveContent['type'];

export function UnlockedContentSection({ content, tierName }: UnlockedContentSectionProps) {
  const [filter, setFilter] = useState<ContentFilter>('all');

  if (content.length === 0) return null;

  const filters: { label: string; value: ContentFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Clips', value: 'clip' },
    { label: 'Playlists', value: 'playlist' },
    { label: 'Messages', value: 'audio-message' },
    { label: 'Merch', value: 'merch-code' },
  ];

  const filteredContent = filter === 'all'
    ? content
    : content.filter((c) => c.type === filter);

  // Only show filters that have content
  const availableFilters = filters.filter((f) =>
    f.value === 'all' || content.some((c) => c.type === f.value)
  );

  return (
    <section>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-2">
        <svg className="w-5 h-5 text-[#1ed760]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
        </svg>
        <h2 className="text-white font-bold text-lg">Your Exclusive Content</h2>
        <Badge variant="subscriber">{tierName}</Badge>
      </div>
      <p className="text-[#a7a7a7] text-sm mb-4">
        Content available with your subscription
      </p>

      {/* Filters */}
      {availableFilters.length > 2 && (
        <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar pb-1">
          {availableFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f.value
                  ? 'bg-white text-black'
                  : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredContent.map((item) => (
          <ContentPreviewCard key={item.id} content={item} />
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-8">
          <p className="text-[#a7a7a7]">No content in this category yet</p>
        </div>
      )}
    </section>
  );
}
