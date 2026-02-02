'use client';

import React, { useState } from 'react';
import { ExclusiveContent } from '@/types';

interface ContentPreviewCardProps {
  content: ExclusiveContent;
  locked?: boolean;
  onClick?: () => void;
}

function ThumbnailWithFallback({
  src,
  alt,
  locked,
  fallbackIcon
}: {
  src: string;
  alt: string;
  locked: boolean;
  fallbackIcon: React.ReactNode;
}) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center">
        {fallbackIcon}
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${locked ? 'blur-locked' : ''}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        onError={() => setError(true)}
      />
    </div>
  );
}

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

const contentTypeLabels: Record<ExclusiveContent['type'], string> = {
  clip: 'Clip',
  playlist: 'Playlist',
  'audio-message': 'Audio Message',
  'artist-pick': 'Artist Pick',
  'early-release': 'Early Release',
  'merch-code': 'Merch Code',
};

export function ContentPreviewCard({ content, locked = false, onClick }: ContentPreviewCardProps) {
  return (
    <div
      className={`relative bg-[#181818] rounded-lg overflow-hidden transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:bg-[#282828]' : ''
      } ${locked ? 'opacity-75' : ''}`}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[#282828]">
        {content.thumbnailUrl ? (
          <ThumbnailWithFallback
            src={content.thumbnailUrl}
            alt={content.title}
            locked={locked}
            fallbackIcon={contentTypeIcons[content.type]}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center">
            {contentTypeIcons[content.type]}
          </div>
        )}

        {/* Lock Overlay */}
        {locked && (
          <div className="lock-overlay">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
        )}

        {/* Play Button Overlay for Clips */}
        {!locked && content.type === 'clip' && onClick && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 bg-[#1ed760] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Content Type Badge */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-black/60 rounded text-[10px] text-white font-medium">
            {contentTypeLabels[content.type]}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h4 className="text-white text-sm font-semibold line-clamp-2 leading-tight">{content.title}</h4>
        <p className="text-[#a7a7a7] text-xs mt-2 line-clamp-2 leading-relaxed">{content.description}</p>
      </div>
    </div>
  );
}
