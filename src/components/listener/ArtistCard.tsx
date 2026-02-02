'use client';

import React from 'react';
import Link from 'next/link';
import { Artist } from '@/types';
import { Badge, VerifiedBadge } from '@/components/ui';

interface ArtistCardProps {
  artist: Artist;
  showSubscribeBadge?: boolean;
  isSubscribed?: boolean;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function ArtistCard({
  artist,
  showSubscribeBadge = true,
  isSubscribed = false,
  variant = 'default',
}: ArtistCardProps) {
  const formatListeners = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  if (variant === 'horizontal') {
    return (
      <Link
        href={`/listener/artist/${artist.id}`}
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#282828] transition-colors"
      >
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          {artist.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold truncate">{artist.name}</h3>
            {artist.verified && <VerifiedBadge className="flex-shrink-0" />}
            {isSubscribed && <Badge variant="subscriber">Subscribed</Badge>}
          </div>
          <p className="text-[#a7a7a7] text-sm">
            {formatListeners(artist.monthlyListeners)} monthly listeners
          </p>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/listener/artist/${artist.id}`}
        className="block w-32 flex-shrink-0"
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center text-white font-bold text-3xl mb-2 hover:scale-105 transition-transform shadow-lg">
          {artist.name.charAt(0)}
        </div>
        <h3 className="text-white font-semibold text-sm text-center truncate">{artist.name}</h3>
        <p className="text-[#a7a7a7] text-xs text-center">Artist</p>
      </Link>
    );
  }

  return (
    <Link
      href={`/listener/artist/${artist.id}`}
      className="block bg-[#181818] rounded-lg p-4 hover:bg-[#282828] transition-colors group"
    >
      <div className="w-full aspect-square rounded-full bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center text-white font-bold text-4xl mb-4 group-hover:scale-105 transition-transform shadow-lg">
        {artist.name.charAt(0)}
      </div>

      <div className="flex items-center gap-2 mb-1">
        <h3 className="text-white font-bold truncate">{artist.name}</h3>
        {artist.verified && <VerifiedBadge className="flex-shrink-0" />}
      </div>

      <p className="text-[#a7a7a7] text-sm mb-2">
        {formatListeners(artist.monthlyListeners)} monthly listeners
      </p>

      {showSubscribeBadge && artist.subscriptionsEnabled && (
        <div className="flex items-center gap-2">
          {isSubscribed ? (
            <Badge variant="subscriber">Subscribed</Badge>
          ) : (
            <Badge variant="default">Fan Subscriptions</Badge>
          )}
        </div>
      )}
    </Link>
  );
}
