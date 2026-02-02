'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/ui';
import { ArtistCard, SubscriptionBanner } from '@/components/listener';

export default function ListenerHomePage() {
  const { artists, getSubscription, setMode } = useApp();

  const artistsWithSubscriptions = artists.filter((a) => a.subscriptionsEnabled);

  return (
    <div className="mobile-container pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-[#121212]/95 backdrop-blur-sm z-10 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-2xl">Good evening</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('artist')}
              className="p-2 bg-[#282828] rounded-full hover:bg-[#3e3e3e] transition-colors"
              title="Switch to Artist View"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>
            <button className="p-2 bg-[#282828] rounded-full hover:bg-[#3e3e3e] transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
              </svg>
            </button>
            <button className="p-2 bg-[#282828] rounded-full hover:bg-[#3e3e3e] transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Subscription Promo Banner */}
      <SubscriptionBanner />

      {/* Artists with Fan Subscriptions */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-xl">Artists with Fan Subscriptions</h2>
        </div>

        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {artistsWithSubscriptions.map((artist) => (
            <div key={artist.id} className="flex-shrink-0">
              <ArtistCard
                artist={artist}
                isSubscribed={!!getSubscription(artist.id)}
                variant="compact"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Recent / Suggested */}
      <section className="px-4 mt-8">
        <h2 className="text-white font-bold text-xl mb-4">Recently played</h2>
        <div className="grid grid-cols-2 gap-3">
          {artistsWithSubscriptions.slice(0, 4).map((artist) => (
            <Link
              key={artist.id}
              href={`/listener/artist/${artist.id}`}
              className="bg-[#282828] rounded-md flex items-center gap-3 pr-4 overflow-hidden hover:bg-[#3e3e3e] transition-colors"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center text-white font-bold flex-shrink-0">
                {artist.name.charAt(0)}
              </div>
              <span className="text-white text-sm font-semibold truncate">{artist.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Made for You */}
      <section className="px-4 mt-8">
        <h2 className="text-white font-bold text-xl mb-4">Made for you</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {['Daily Mix 1', 'Discover Weekly', 'Release Radar', 'On Repeat'].map((playlist, index) => (
            <div key={playlist} className="flex-shrink-0 w-36">
              <div className={`w-36 h-36 rounded-md mb-2 bg-gradient-to-br ${
                index % 4 === 0 ? 'from-[#1ed760] to-[#509bf5]' :
                index % 4 === 1 ? 'from-[#af2896] to-[#509bf5]' :
                index % 4 === 2 ? 'from-[#e91429] to-[#ffa42b]' :
                'from-[#1ed760] to-[#ffa42b]'
              } flex items-center justify-center`}>
                <svg className="w-12 h-12 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-sm">{playlist}</h3>
              <p className="text-[#a7a7a7] text-xs line-clamp-2">
                Your personalized playlist
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Subscriptions */}
      <section className="px-4 mt-8 mb-8">
        <h2 className="text-white font-bold text-xl mb-4">Explore fan subscriptions</h2>
        <div className="grid gap-4">
          {artistsWithSubscriptions.map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              isSubscribed={!!getSubscription(artist.id)}
              variant="horizontal"
            />
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
}
