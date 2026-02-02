'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/ui';
import { ArtistCard, SubscriptionBanner } from '@/components/listener';

function ArtistImage({ src, alt }: { src: string; alt: string }) {
  const [error, setError] = useState(false);
  if (error || !src) {
    return (
      <div className="w-12 h-12 bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center text-white font-bold flex-shrink-0">
        {alt.charAt(0)}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="w-12 h-12 object-cover flex-shrink-0"
      onError={() => setError(true)}
    />
  );
}

export default function ListenerHomePage() {
  const router = useRouter();
  const { artists, getSubscription, setMode } = useApp();

  const artistsWithSubscriptions = artists.filter((a) => a.subscriptionsEnabled);

  return (
    <div className="mobile-container pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-[#121212]/95 backdrop-blur-sm z-10 px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-bold text-2xl">Good evening</h1>
          <div className="flex items-center gap-3">
            <button className="p-2 bg-[#282828] rounded-full hover:bg-[#3e3e3e] transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
              </svg>
            </button>
            <button className="p-2 bg-[#282828] rounded-full hover:bg-[#3e3e3e] transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Artist Dashboard Toggle Banner */}
      <div className="mx-4 mt-2 mb-4">
        <button
          onClick={() => {
            setMode('artist');
            router.push('/artist/dashboard');
          }}
          className="w-full bg-gradient-to-r from-[#1ed760] to-[#1db954] rounded-lg p-4 flex items-center justify-between hover:opacity-90 transition-opacity"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-black font-bold text-sm">Switch to Artist View</p>
              <p className="text-black/70 text-xs">Manage tiers, content & analytics</p>
            </div>
          </div>
          <svg className="w-5 h-5 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

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
              className="bg-[#282828] rounded-md flex items-center gap-3 pr-3 overflow-hidden hover:bg-[#3e3e3e] transition-colors"
            >
              <ArtistImage src={artist.imageUrl} alt={artist.name} />
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
        <div className="grid gap-3">
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
