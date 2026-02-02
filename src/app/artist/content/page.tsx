'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { ContentCreator } from '@/components/artist';
import { Button, Badge, Modal } from '@/components/ui';
import { ExclusiveContent } from '@/types';

const contentTypeLabels: Record<ExclusiveContent['type'], string> = {
  clip: 'Clip',
  playlist: 'Playlist',
  'audio-message': 'Audio Message',
  'artist-pick': 'Artist Pick',
  'early-release': 'Early Release',
  'merch-code': 'Merch Code',
};

const contentTypeIcons: Record<ExclusiveContent['type'], React.ReactNode> = {
  clip: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  playlist: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
    </svg>
  ),
  'audio-message': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm-1-9c0-.55.45-1 1-1s1 .45 1 1v6c0 .55-.45 1-1 1s-1-.45-1-1V5zm6 6c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </svg>
  ),
  'artist-pick': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  'early-release': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  ),
  'merch-code': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
    </svg>
  ),
};

export default function ContentPage() {
  const { currentArtist, getTiersForArtist, getContentForArtist, createContent, getTierById } = useApp();
  const [showCreator, setShowCreator] = useState(false);
  const [filter, setFilter] = useState<ExclusiveContent['type'] | 'all'>('all');

  if (!currentArtist) {
    return <div className="text-white">No artist selected</div>;
  }

  const tiers = getTiersForArtist(currentArtist.id);
  const allContent = getContentForArtist(currentArtist.id);
  const filteredContent = filter === 'all'
    ? allContent
    : allContent.filter((c) => c.type === filter);

  const handleCreateContent = (contentData: Omit<ExclusiveContent, 'id' | 'createdAt'>) => {
    createContent(contentData);
    setShowCreator(false);
  };

  const contentTypes = Object.keys(contentTypeLabels) as ExclusiveContent['type'][];
  const usedTypes = new Set(allContent.map((c) => c.type));

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white font-bold text-3xl mb-2">Exclusive Content</h1>
          <p className="text-[#a7a7a7]">
            Create and manage content for your subscribers
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowCreator(true)}>
          Create Content
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto hide-scrollbar pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
            filter === 'all'
              ? 'bg-white text-black'
              : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
          }`}
        >
          All ({allContent.length})
        </button>
        {contentTypes.filter((type) => usedTypes.has(type)).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
              filter === type
                ? 'bg-white text-black'
                : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
            }`}
          >
            {contentTypeLabels[type]}
            <span className="opacity-60">
              ({allContent.filter((c) => c.type === type).length})
            </span>
          </button>
        ))}
      </div>

      {/* Content List */}
      {filteredContent.length === 0 ? (
        <div className="bg-[#181818] rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-[#282828] rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-[#a7a7a7]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
            </svg>
          </div>
          <h3 className="text-white font-bold text-lg mb-2">
            {filter === 'all' ? 'No content yet' : `No ${contentTypeLabels[filter]}s yet`}
          </h3>
          <p className="text-[#a7a7a7] mb-4">
            Create exclusive content to reward your subscribers
          </p>
          <Button variant="primary" onClick={() => setShowCreator(true)}>
            Create Your First Content
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContent.map((content) => {
            const accessibleTiers = content.tierAccess
              .map((tierId) => getTierById(tierId))
              .filter(Boolean);

            return (
              <div key={content.id} className="bg-[#181818] rounded-xl p-5 hover:bg-[#1f1f1f] transition-colors">
                <div className="flex items-start gap-4">
                  {/* Content Type Icon */}
                  <div className="w-12 h-12 rounded-lg bg-[#282828] flex items-center justify-center text-[#1ed760] flex-shrink-0">
                    {contentTypeIcons[content.type]}
                  </div>

                  {/* Content Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold truncate">{content.title}</h3>
                      <Badge variant="default">{contentTypeLabels[content.type]}</Badge>
                    </div>
                    <p className="text-[#a7a7a7] text-sm line-clamp-2 mb-2">{content.description}</p>

                    {/* Tier Access */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[#a7a7a7] text-xs">Accessible to:</span>
                      {accessibleTiers.map((tier) => (
                        <span key={tier!.id} className="px-2 py-0.5 bg-[#282828] rounded text-white text-xs">
                          {tier!.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-[#a7a7a7] text-sm text-right flex-shrink-0">
                    {new Date(content.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>

                {/* Merch Code Display */}
                {content.type === 'merch-code' && content.content && (
                  <div className="mt-4 pt-4 border-t border-[#282828]">
                    <div className="flex items-center gap-2">
                      <span className="text-[#a7a7a7] text-sm">Code:</span>
                      <code className="px-3 py-1 bg-[#282828] rounded text-[#1ed760] font-mono">
                        {content.content}
                      </code>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Content Creator Modal */}
      <Modal
        isOpen={showCreator}
        onClose={() => setShowCreator(false)}
        title="Create Exclusive Content"
      >
        <div className="p-6">
          <ContentCreator
            artistId={currentArtist.id}
            tiers={tiers}
            onSave={handleCreateContent}
            onCancel={() => setShowCreator(false)}
          />
        </div>
      </Modal>
    </div>
  );
}
