'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { BottomNav, Badge } from '@/components/ui';
import { ArtistCard } from '@/components/listener';

type Tab = 'playlists' | 'artists' | 'subscriptions';

function LibraryContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') as Tab | null;
  const [activeTab, setActiveTab] = useState<Tab>(initialTab || 'subscriptions');

  const { getSubscribedArtists, artists, getTierById, getSubscription } = useApp();
  const subscribedArtists = getSubscribedArtists();

  const tabs: { id: Tab; label: string }[] = [
    { id: 'playlists', label: 'Playlists' },
    { id: 'artists', label: 'Artists' },
    { id: 'subscriptions', label: 'Supporting' },
  ];

  return (
    <div className="mobile-container pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-[#121212]/95 backdrop-blur-sm z-10 px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white font-bold text-2xl">Your Library</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#1ed760] text-black'
                  : 'bg-[#282828] text-white hover:bg-[#3e3e3e]'
              }`}
            >
              {tab.label}
              {tab.id === 'subscriptions' && subscribedArtists.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-black/20 rounded-full text-xs">
                  {subscribedArtists.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4">
        {activeTab === 'subscriptions' && (
          <>
            {subscribedArtists.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#282828] rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#a7a7a7]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <h2 className="text-white font-bold text-lg mb-2">No subscriptions yet</h2>
                <p className="text-[#a7a7a7] text-sm mb-4">
                  Support your favorite artists with exclusive subscriptions
                </p>
                <a
                  href="/listener/home"
                  className="inline-block px-6 py-3 bg-[#1ed760] text-black font-bold rounded-full hover:scale-105 transition-transform"
                >
                  Explore Artists
                </a>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-[#a7a7a7] text-sm mb-4">
                  You&apos;re supporting {subscribedArtists.length} artist{subscribedArtists.length > 1 ? 's' : ''}
                </p>
                {subscribedArtists.map((artist) => {
                  const subscription = getSubscription(artist.id);
                  const tier = subscription ? getTierById(subscription.tierId) : null;

                  return (
                    <a
                      key={artist.id}
                      href={`/listener/artist/${artist.id}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#282828] transition-colors"
                    >
                      <img
                        src={artist.imageUrl}
                        alt={artist.name}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center text-white font-bold text-xl flex-shrink-0 hidden">
                        {artist.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold truncate">{artist.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {tier && <Badge variant="subscriber">{tier.name}</Badge>}
                          <span className="text-[#a7a7a7] text-sm">
                            ${tier?.priceMonthly.toFixed(2)}/mo
                          </span>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-[#a7a7a7]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </a>
                  );
                })}
              </div>
            )}
          </>
        )}

        {activeTab === 'artists' && (
          <div className="space-y-2">
            {artists.map((artist) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                isSubscribed={!!getSubscription(artist.id)}
                variant="horizontal"
              />
            ))}
          </div>
        )}

        {activeTab === 'playlists' && (
          <div className="space-y-2">
            {['Liked Songs', 'Daily Mix 1', 'Discover Weekly', 'Release Radar'].map((playlist, index) => (
              <div
                key={playlist}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#282828] transition-colors cursor-pointer"
              >
                <div className={`w-14 h-14 rounded flex items-center justify-center ${
                  index === 0
                    ? 'bg-gradient-to-br from-[#450af5] to-[#c4efd9]'
                    : 'bg-[#282828]'
                }`}>
                  {index === 0 ? (
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-[#a7a7a7]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold truncate">{playlist}</h3>
                  <p className="text-[#a7a7a7] text-sm">
                    {index === 0 ? '147 songs' : 'Playlist'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={
      <div className="mobile-container flex items-center justify-center min-h-screen">
        <div className="animate-pulse">
          <svg className="w-12 h-12 text-[#1ed760]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
      </div>
    }>
      <LibraryContent />
    </Suspense>
  );
}
