'use client';

import React, { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { BottomNav, Badge, VerifiedBadge, Button } from '@/components/ui';
import { TierCard, TierDetailModal, LockedContentSection, UnlockedContentSection } from '@/components/listener';

interface ArtistPageProps {
  params: Promise<{ id: string }>;
}

function ArtistHeroImage({ src, fallbackSrc, alt }: { src: string; fallbackSrc: string; alt: string }) {
  const [imageError, setImageError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  if ((imageError && fallbackError) || (!src && !fallbackSrc)) {
    return (
      <div className="w-full h-48 bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center text-white font-bold text-6xl">
        {alt.charAt(0)}
      </div>
    );
  }

  if (imageError) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className="w-full h-48 object-cover"
        onError={() => setFallbackError(true)}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

export default function ArtistPage({ params }: ArtistPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const {
    getArtistById,
    getTiersForArtist,
    getSubscription,
    getContentForArtist,
    getAccessibleContent,
    getTierById,
  } = useApp();

  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showTierDetail, setShowTierDetail] = useState(false);

  const artist = getArtistById(resolvedParams.id);
  const tiers = getTiersForArtist(resolvedParams.id);
  const subscription = getSubscription(resolvedParams.id);
  const allContent = getContentForArtist(resolvedParams.id);
  const accessibleContent = getAccessibleContent(resolvedParams.id);
  const currentTier = subscription ? getTierById(subscription.tierId) : null;

  if (!artist) {
    return (
      <div className="mobile-container flex items-center justify-center min-h-screen">
        <p className="text-white">Artist not found</p>
      </div>
    );
  }

  const formatListeners = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${Math.round(num / 1000)}K`;
    }
    return num.toString();
  };

  const handleSubscribe = () => {
    router.push(`/listener/subscribe/${artist.id}`);
  };

  const handleViewTierDetails = (tierId: string) => {
    setSelectedTier(tierId);
    setShowTierDetail(true);
  };

  const selectedTierData = selectedTier ? getTierById(selectedTier) : null;
  const tierPreviewContent = selectedTier
    ? allContent.filter((c) => c.tierAccess.includes(selectedTier))
    : [];

  return (
    <div className="mobile-container pb-24">
      {/* Header with Back Button */}
      <div className="sticky top-0 bg-gradient-to-b from-[#282828] to-transparent z-10 px-4 py-4">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Artist Hero Image */}
      <div className="-mt-14">
        <ArtistHeroImage
          src={artist.headerImageUrl}
          fallbackSrc={artist.imageUrl}
          alt={artist.name}
        />
      </div>

      {/* Artist Info */}
      <div className="px-4 -mt-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-white font-bold text-2xl">{artist.name}</h1>
            {artist.verified && <VerifiedBadge />}
          </div>
          {subscription && <Badge variant="subscriber">Subscribed</Badge>}
          <p className="text-[#a7a7a7] text-sm mt-2">
            {formatListeners(artist.monthlyListeners)} monthly listeners
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {!subscription ? (
            <Button variant="primary" onClick={handleSubscribe}>
              Subscribe
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => router.push(`/listener/subscribe/${artist.id}`)}
            >
              Manage Subscription
            </Button>
          )}
          <button className="p-3 hover:bg-white/10 rounded-full transition-colors">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Subscription Section */}
      {artist.subscriptionsEnabled && (
        <section className="px-4 mt-8">
          {subscription && currentTier ? (
            <>
              {/* Show Unlocked Content */}
              <UnlockedContentSection
                content={accessibleContent}
                tierName={currentTier.name}
                artistName={artist.name}
              />

              {/* Show upgrade options if not on highest tier */}
              {tiers.some((t) => t.priceMonthly > currentTier.priceMonthly) && (
                <div className="mt-8">
                  <h2 className="text-white font-bold text-lg mb-4">Upgrade for more</h2>
                  <div className="space-y-4">
                    {tiers
                      .filter((t) => t.priceMonthly > currentTier.priceMonthly)
                      .map((tier) => (
                        <TierCard
                          key={tier.id}
                          tier={tier}
                          compact
                          onViewDetails={() => handleViewTierDetails(tier.id)}
                        />
                      ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Show Tier Preview Cards */}
              <div className="mb-6">
                <h2 className="text-white font-bold text-lg mb-4">Fan Subscription Tiers</h2>
                <div className="space-y-4">
                  {tiers.map((tier) => (
                    <TierCard
                      key={tier.id}
                      tier={tier}
                      compact
                      onViewDetails={() => handleViewTierDetails(tier.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Show Locked Content */}
              <div className="mt-8">
                <LockedContentSection
                  content={allContent}
                  onSubscribe={handleSubscribe}
                />
              </div>
            </>
          )}
        </section>
      )}

      {/* Artist Bio */}
      <section className="px-4 mt-8">
        <h2 className="text-white font-bold text-lg mb-2">About</h2>
        <p className="text-[#a7a7a7] text-sm leading-relaxed">{artist.bio}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-[#282828] rounded-full text-white text-xs">
            {artist.genre}
          </span>
          <span className="px-3 py-1 bg-[#282828] rounded-full text-white text-xs">
            {artist.label}
          </span>
        </div>
      </section>

      {/* Popular Tracks (Mock) */}
      <section className="px-4 mt-8">
        <h2 className="text-white font-bold text-lg mb-4">Popular</h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 py-2 hover:bg-white/5 rounded transition-colors">
              <span className="text-[#a7a7a7] text-sm w-4">{i}</span>
              <div className="w-10 h-10 rounded bg-[#282828]" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Track Title {i}</p>
                <p className="text-[#a7a7a7] text-xs">{Math.floor(Math.random() * 50 + 10)}M plays</p>
              </div>
              <span className="text-[#a7a7a7] text-sm">3:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Albums (Mock) */}
      <section className="px-4 mt-8 mb-8">
        <h2 className="text-white font-bold text-lg mb-4">Discography</h2>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
          {[artist.latestAlbum, 'Previous Album', 'Early Work'].map((album, i) => (
            <div key={album} className="flex-shrink-0 w-36">
              <div className={`w-36 h-36 rounded-md mb-2 bg-gradient-to-br ${
                i === 0 ? 'from-[#535353] to-[#282828]' :
                i === 1 ? 'from-[#3e3e3e] to-[#1a1a1a]' :
                'from-[#2a2a2a] to-[#121212]'
              } flex items-center justify-center`}>
                <svg className="w-12 h-12 text-white/30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-sm truncate">{album}</h3>
              <p className="text-[#a7a7a7] text-xs">
                {i === 0 ? artist.latestAlbumDate : `202${4 - i}`} • Album
              </p>
            </div>
          ))}
        </div>
      </section>

      <BottomNav />

      {/* Tier Detail Modal */}
      {selectedTierData && (
        <TierDetailModal
          isOpen={showTierDetail}
          onClose={() => setShowTierDetail(false)}
          tier={selectedTierData}
          artist={artist}
          previewContent={tierPreviewContent}
          onSubscribe={() => {
            setShowTierDetail(false);
            router.push(`/listener/subscribe/${artist.id}?tier=${selectedTier}`);
          }}
          isCurrentTier={subscription?.tierId === selectedTier}
          otherTiers={tiers.filter((t) => t.id !== selectedTier)}
        />
      )}
    </div>
  );
}
