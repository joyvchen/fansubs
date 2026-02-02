'use client';

import React from 'react';
import { Tier, Artist, ExclusiveContent } from '@/types';
import { Modal, Button, FeatureList, Badge } from '@/components/ui';
import { ContentPreviewCard } from '@/components/ui/ContentPreviewCard';

interface TierDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  tier: Tier;
  artist: Artist;
  previewContent: ExclusiveContent[];
  onSubscribe: () => void;
  isCurrentTier?: boolean;
  otherTiers?: Tier[];
}

export function TierDetailModal({
  isOpen,
  onClose,
  tier,
  artist,
  previewContent,
  onSubscribe,
  isCurrentTier = false,
  otherTiers = [],
}: TierDetailModalProps) {
  const tierIndex = parseInt(tier.id.slice(-1)) || 1;
  const higherTiers = otherTiers.filter((t) => t.priceMonthly > tier.priceMonthly);

  return (
    <Modal isOpen={isOpen} onClose={onClose} fullScreen>
      <div className="px-5 pb-36">
        {/* Tier Header */}
        <div className={`tier-gradient-${Math.min(tierIndex, 3)} rounded-xl p-7 mb-8`}>
          {/* Badge row - inline instead of absolute */}
          {tier.highlight && (
            <div className="flex justify-end mb-5">
              <Badge variant={tier.highlight === 'Most Popular' ? 'popular' : 'value'}>
                {tier.highlight}
              </Badge>
            </div>
          )}

          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1ed760] to-[#509bf5] flex items-center justify-center text-black font-bold text-lg">
              {artist.name.charAt(0)}
            </div>
            <div>
              <p className="text-[#a7a7a7] text-sm">{artist.name}</p>
              <h1 className="text-white font-bold text-2xl">{tier.name}</h1>
            </div>
          </div>

          <p className="text-white text-lg mb-2">{tier.tagline}</p>
          <p className="text-[#a7a7a7] text-sm">{tier.description}</p>

          <div className="mt-4 pt-4 border-t border-white/10">
            <span className="text-white font-bold text-3xl">${tier.priceMonthly.toFixed(2)}</span>
            <span className="text-[#a7a7a7] text-sm">/month</span>
          </div>
        </div>

        {/* What You Get */}
        <section className="mb-10">
          <h2 className="text-white font-bold text-lg mb-5">What you get</h2>
          <div className="bg-[#181818] rounded-xl p-5">
            <FeatureList features={tier.features} />
          </div>
        </section>

        {/* Content Preview */}
        {previewContent.length > 0 && (
          <section className="mb-10">
            <h2 className="text-white font-bold text-lg mb-5">Exclusive content preview</h2>
            <div className="grid grid-cols-2 gap-5">
              {previewContent.slice(0, 4).map((content) => (
                <ContentPreviewCard key={content.id} content={content} locked />
              ))}
            </div>
            {previewContent.length > 4 && (
              <p className="text-[#a7a7a7] text-sm text-center mt-3">
                +{previewContent.length - 4} more exclusive items
              </p>
            )}
          </section>
        )}

        {/* Upgrade Callout */}
        {higherTiers.length > 0 && (
          <section className="mb-10">
            <div className="bg-[#282828] rounded-xl p-5">
              <h3 className="text-white font-semibold mb-2">Want more?</h3>
              <p className="text-[#a7a7a7] text-sm mb-3">
                Upgrade to <span className="text-white">{higherTiers[0].name}</span> for{' '}
                <span className="text-[#1ed760]">${higherTiers[0].priceMonthly.toFixed(2)}/mo</span> to unlock:
              </p>
              <ul className="space-y-1">
                {higherTiers[0].features
                  .filter((f) => !tier.features.includes(f) && !f.startsWith('All'))
                  .slice(0, 3)
                  .map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-[#a7a7a7]">
                      <svg className="w-4 h-4 text-[#ffa42b]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        )}
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent pt-8 pb-8 px-5">
        <div className="max-w-[375px] mx-auto">
          {isCurrentTier ? (
            <Button variant="secondary" fullWidth disabled>
              Current Plan
            </Button>
          ) : (
            <Button variant="primary" fullWidth onClick={onSubscribe} className="glow-green">
              Subscribe to {tier.name} — ${tier.priceMonthly.toFixed(2)}/mo
            </Button>
          )}
          <p className="text-[#a7a7a7] text-xs text-center mt-2">
            Cancel anytime. Billed monthly.
          </p>
        </div>
      </div>
    </Modal>
  );
}
