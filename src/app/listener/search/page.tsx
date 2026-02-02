'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/ui';
import { ArtistCard } from '@/components/listener';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { artists, getSubscription } = useApp();

  const filteredArtists = query
    ? artists.filter((a) =>
        a.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const genres = [
    { name: 'Pop', color: 'from-[#e13300] to-[#e8115b]' },
    { name: 'Hip-Hop', color: 'from-[#ba5d07] to-[#af2896]' },
    { name: 'Rock', color: 'from-[#e91429] to-[#dc148c]' },
    { name: 'Indie', color: 'from-[#8d67ab] to-[#148a08]' },
    { name: 'Electronic', color: 'from-[#1e3264] to-[#509bf5]' },
    { name: 'R&B', color: 'from-[#bc5900] to-[#e13300]' },
  ];

  return (
    <div className="mobile-container pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-[#121212]/95 backdrop-blur-sm z-10 px-4 py-4">
        <h1 className="text-white font-bold text-2xl mb-4">Search</h1>

        {/* Search Input */}
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#121212]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Artists, songs, or podcasts"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white text-black rounded-md placeholder:text-[#757575] border-none"
          />
        </div>
      </header>

      {/* Search Results */}
      {query && (
        <div className="px-4 py-4">
          {filteredArtists.length > 0 ? (
            <div className="space-y-2">
              <h2 className="text-white font-bold mb-3">Artists</h2>
              {filteredArtists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  isSubscribed={!!getSubscription(artist.id)}
                  variant="horizontal"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[#a7a7a7]">No results found for &quot;{query}&quot;</p>
            </div>
          )}
        </div>
      )}

      {/* Browse Categories */}
      {!query && (
        <div className="px-4 py-4">
          <h2 className="text-white font-bold mb-4">Browse all</h2>
          <div className="grid grid-cols-2 gap-4">
            {genres.map((genre) => (
              <div
                key={genre.name}
                className={`h-24 rounded-lg bg-gradient-to-br ${genre.color} p-3 overflow-hidden relative`}
              >
                <h3 className="text-white font-bold text-lg">{genre.name}</h3>
              </div>
            ))}
          </div>

          {/* Artists with Subscriptions */}
          <div className="mt-8">
            <h2 className="text-white font-bold mb-4">Artists with Fan Subscriptions</h2>
            <div className="space-y-2">
              {artists.filter((a) => a.subscriptionsEnabled).map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  isSubscribed={!!getSubscription(artist.id)}
                  variant="horizontal"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
