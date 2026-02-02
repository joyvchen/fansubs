'use client';

import React from 'react';
import { Tier } from '@/types';
import { Badge, Button } from '@/components/ui';

interface TierCardProps {
  tier: Tier;
  isCurrentTier?: boolean;
  onSelect?: () => void;
  onViewDetails?: () => void;
  compact?: boolean;
}

export function TierCard({
  tier,
  isCurrentTier = false,
  onSelect,
  onViewDetails,
  compact = false,
}: TierCardProps) {
  const tierIndex = parseInt(tier.id.slice(-1)) || 1;
  const gradientClass = `tier-gradient-${Math.min(tierIndex, 3)}`;

  if (compact) {
    return (
      <div className={`${gradientClass} rounded-lg p-6 relative ${tier.highlight ? 'pt-8' : ''}`}>
        {tier.highlight && (
          <div className="absolute top-2 right-4">
            <Badge variant={tier.highlight === 'Most Popular' ? 'popular' : 'value'}>
              {tier.highlight}
            </Badge>
          </div>
        )}

        <div className="flex justify-between items-start mb-4 gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg leading-tight">{tier.name}</h3>
            <p className="text-[#a7a7a7] text-sm mt-1">{tier.tagline}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <span className="text-white font-bold text-xl">${tier.priceMonthly.toFixed(2)}</span>
            <span className="text-[#a7a7a7] text-sm">/mo</span>
          </div>
        </div>

        <button
          onClick={onViewDetails}
          className="text-[#1ed760] text-sm font-medium hover:underline"
        >
          See what&apos;s included
        </button>
      </div>
    );
  }

  return (
    <div className={`${gradientClass} rounded-xl p-7 relative ${tier.highlight || isCurrentTier ? 'pt-9' : ''}`}>
      {tier.highlight && (
        <div className="absolute top-2 right-5">
          <Badge variant={tier.highlight === 'Most Popular' ? 'popular' : 'value'}>
            {tier.highlight}
          </Badge>
        </div>
      )}

      {isCurrentTier && (
        <div className="absolute top-2 left-5">
          <Badge variant="subscriber">Current Plan</Badge>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-white font-bold text-xl mb-2">{tier.name}</h3>
        <p className="text-[#a7a7a7] text-sm">{tier.tagline}</p>
      </div>

      <div className="mb-6">
        <span className="text-white font-bold text-3xl">${tier.priceMonthly.toFixed(2)}</span>
        <span className="text-[#a7a7a7] text-sm">/month</span>
      </div>

      <p className="text-[#a7a7a7] text-sm mb-6 line-clamp-3 leading-relaxed">{tier.description}</p>

      <ul className="space-y-3 mb-6">
        {tier.features.slice(0, 3).map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-white">
            <svg className="w-4 h-4 text-[#1ed760] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
        {tier.features.length > 3 && (
          <li className="text-[#a7a7a7] text-sm pl-7">
            +{tier.features.length - 3} more benefits
          </li>
        )}
      </ul>

      <div className="space-y-4">
        {onSelect && !isCurrentTier && (
          <Button variant="primary" fullWidth onClick={onSelect}>
            Subscribe to {tier.name}
          </Button>
        )}
        {isCurrentTier && (
          <Button variant="secondary" fullWidth disabled>
            Current Plan
          </Button>
        )}
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="w-full text-center text-[#1ed760] text-sm font-medium hover:underline py-3"
          >
            See what&apos;s included
          </button>
        )}
      </div>
    </div>
  );
}
