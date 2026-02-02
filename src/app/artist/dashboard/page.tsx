'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { StatCard, RevenueChart } from '@/components/artist';
import { Button } from '@/components/ui';

export default function ArtistDashboardPage() {
  const { currentArtist, getAnalyticsForArtist, getTiersForArtist, getContentForArtist } = useApp();

  if (!currentArtist) {
    return <div className="text-white">No artist selected</div>;
  }

  const analytics = getAnalyticsForArtist(currentArtist.id);
  const tiers = getTiersForArtist(currentArtist.id);
  const content = getContentForArtist(currentArtist.id);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white font-bold text-3xl mb-2">Welcome back, {currentArtist.name}</h1>
        <p className="text-[#a7a7a7]">
          {formatNumber(currentArtist.monthlyListeners)} monthly listeners
        </p>
      </div>

      {/* Quick Stats */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Total Subscribers"
            value={formatNumber(analytics.totalSubscribers)}
            trend="up"
            trendValue={`+${analytics.newSubscribersThisMonth} this month`}
          />
          <StatCard
            label="Monthly Revenue"
            value={formatCurrency(analytics.mrr)}
            trend="up"
            trendValue="+12% from last month"
          />
          <StatCard
            label="Churn Rate"
            value={`${analytics.churnRate}%`}
            trend="down"
            trendValue="-0.3% from last month"
          />
          <StatCard
            label="Active Tiers"
            value={tiers.length}
            subValue="of 3 max"
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#181818] rounded-xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/artist/content">
              <Button variant="primary" fullWidth>
                Create Exclusive Content
              </Button>
            </Link>
            <Link href="/artist/subscriptions">
              <Button variant="secondary" fullWidth>
                Manage Tiers
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-[#181818] rounded-xl p-6">
          <h2 className="text-white font-bold text-lg mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {analytics && (
              <>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#1ed760]/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#1ed760]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white">+{analytics.newSubscribersThisMonth} new subscribers</p>
                    <p className="text-[#a7a7a7] text-xs">This month</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-[#509bf5]/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#509bf5]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white">{content.length} exclusive items</p>
                    <p className="text-[#a7a7a7] text-xs">Available to subscribers</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      {analytics && analytics.revenueHistory.length > 0 && (
        <RevenueChart data={analytics.revenueHistory} />
      )}

      {/* Tier Performance */}
      {analytics && tiers.length > 0 && (
        <div className="mt-8">
          <h2 className="text-white font-bold text-lg mb-4">Tier Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier) => {
              const tierSubs = analytics.subscribersByTier[tier.id] || 0;
              const percentage = analytics.totalSubscribers > 0
                ? Math.round((tierSubs / analytics.totalSubscribers) * 100)
                : 0;

              return (
                <div key={tier.id} className="bg-[#181818] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">{tier.name}</h3>
                    <span className="text-[#a7a7a7] text-sm">${tier.priceMonthly}/mo</span>
                  </div>
                  <p className="text-white font-bold text-2xl mb-2">
                    {formatNumber(tierSubs)}
                  </p>
                  <div className="progress-bar mb-2">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <p className="text-[#a7a7a7] text-sm">{percentage}% of subscribers</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
