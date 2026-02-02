'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { StatCard, RevenueChart } from '@/components/artist';

export default function AnalyticsPage() {
  const { currentArtist, getAnalyticsForArtist, getTiersForArtist } = useApp();

  if (!currentArtist) {
    return <div className="text-white">No artist selected</div>;
  }

  const analytics = getAnalyticsForArtist(currentArtist.id);
  const tiers = getTiersForArtist(currentArtist.id);

  if (!analytics) {
    return <div className="text-white">No analytics data available</div>;
  }

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

  // Calculate tier distribution for pie chart simulation
  const tierColors = ['#1ed760', '#509bf5', '#ffa42b'];
  const tierData = tiers.map((tier, index) => ({
    ...tier,
    subscribers: analytics.subscribersByTier[tier.id] || 0,
    color: tierColors[index % tierColors.length],
    percentage: analytics.totalSubscribers > 0
      ? Math.round(((analytics.subscribersByTier[tier.id] || 0) / analytics.totalSubscribers) * 100)
      : 0,
  }));

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-white font-bold text-3xl mb-2">Analytics</h1>
        <p className="text-[#a7a7a7]">
          Track your subscription performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Subscribers"
          value={formatNumber(analytics.totalSubscribers)}
          trend="up"
          trendValue={`+${analytics.newSubscribersThisMonth} this month`}
        />
        <StatCard
          label="Monthly Revenue (MRR)"
          value={formatCurrency(analytics.mrr)}
          trend="up"
          trendValue="+12.3% vs last month"
        />
        <StatCard
          label="Churn Rate"
          value={`${analytics.churnRate}%`}
          trend="down"
          trendValue="-0.3% vs last month"
        />
        <StatCard
          label="Avg Revenue Per User"
          value={`$${(analytics.mrr / analytics.totalSubscribers).toFixed(2)}`}
          trend="up"
          trendValue="+$0.12 vs last month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <RevenueChart data={analytics.revenueHistory} />

        {/* Subscribers by Tier */}
        <div className="bg-[#181818] rounded-xl p-5">
          <h3 className="text-white font-bold mb-4">Subscribers by Tier</h3>

          {/* Simple bar visualization */}
          <div className="space-y-4">
            {tierData.map((tier) => (
              <div key={tier.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-white text-sm font-medium">{tier.name}</span>
                  <span className="text-[#a7a7a7] text-sm">
                    {formatNumber(tier.subscribers)} ({tier.percentage}%)
                  </span>
                </div>
                <div className="h-3 bg-[#282828] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${tier.percentage}%`,
                      backgroundColor: tier.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-[#282828]">
            {tierData.map((tier) => (
              <div key={tier.id} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tier.color }}
                />
                <span className="text-[#a7a7a7] text-xs">{tier.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subscriber Flow */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#181818] rounded-xl p-5">
          <h3 className="text-white font-bold mb-4">New Subscribers</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#1ed760]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#1ed760]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-3xl">{analytics.newSubscribersThisMonth}</p>
              <p className="text-[#a7a7a7] text-sm">New subscribers this month</p>
            </div>
          </div>
        </div>

        <div className="bg-[#181818] rounded-xl p-5">
          <h3 className="text-white font-bold mb-4">Canceled</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#e91429]/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-[#e91429]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-3xl">{analytics.canceledThisMonth}</p>
              <p className="text-[#a7a7a7] text-sm">Cancellations this month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Net Growth */}
      <div className="bg-gradient-to-r from-[#1a472a] to-[#1e3a5f] rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#a7a7a7] text-sm mb-1">Net Growth</p>
            <p className="text-white font-bold text-3xl">
              +{analytics.newSubscribersThisMonth - analytics.canceledThisMonth}
            </p>
            <p className="text-[#a7a7a7] text-sm">subscribers this month</p>
          </div>
          <div className="text-right">
            <p className="text-[#a7a7a7] text-sm mb-1">Growth Rate</p>
            <p className="text-[#1ed760] font-bold text-2xl">
              +{(((analytics.newSubscribersThisMonth - analytics.canceledThisMonth) / analytics.totalSubscribers) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* Geographic Distribution (Mock) */}
      <div className="mt-8 bg-[#181818] rounded-xl p-5">
        <h3 className="text-white font-bold mb-4">Top Regions</h3>
        <div className="space-y-3">
          {[
            { region: 'United States', percentage: 45 },
            { region: 'United Kingdom', percentage: 18 },
            { region: 'Australia', percentage: 12 },
            { region: 'Canada', percentage: 10 },
            { region: 'Germany', percentage: 8 },
            { region: 'Other', percentage: 7 },
          ].map((item) => (
            <div key={item.region} className="flex items-center gap-4">
              <span className="text-white text-sm w-32">{item.region}</span>
              <div className="flex-1 h-2 bg-[#282828] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1ed760] rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-[#a7a7a7] text-sm w-12 text-right">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
