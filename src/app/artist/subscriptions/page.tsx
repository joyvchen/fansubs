'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { TierEditor } from '@/components/artist';
import { Button, Badge, Modal } from '@/components/ui';
import { Tier } from '@/types';

export default function SubscriptionsPage() {
  const {
    currentArtist,
    getTiersForArtist,
    getAnalyticsForArtist,
    createTier,
    updateTier,
    deleteTier,
  } = useApp();

  const [showTierEditor, setShowTierEditor] = useState(false);
  const [editingTier, setEditingTier] = useState<Tier | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  if (!currentArtist) {
    return <div className="text-white">No artist selected</div>;
  }

  const tiers = getTiersForArtist(currentArtist.id);
  const analytics = getAnalyticsForArtist(currentArtist.id);

  const handleCreateTier = () => {
    setEditingTier(null);
    setShowTierEditor(true);
  };

  const handleEditTier = (tier: Tier) => {
    setEditingTier(tier);
    setShowTierEditor(true);
  };

  const handleSaveTier = (tierData: Partial<Tier>) => {
    if (editingTier) {
      updateTier(editingTier.id, tierData);
    } else {
      createTier(tierData as Omit<Tier, 'id'>);
    }
    setShowTierEditor(false);
    setEditingTier(null);
  };

  const handleDeleteTier = (tierId: string) => {
    deleteTier(tierId);
    setShowDeleteConfirm(null);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white font-bold text-3xl mb-2">Fan Subscriptions</h1>
          <p className="text-[#a7a7a7]">
            Manage your subscription tiers and exclusive content
          </p>
        </div>
        {tiers.length < 3 && (
          <Button variant="primary" onClick={handleCreateTier}>
            Create New Tier
          </Button>
        )}
      </div>

      {/* Summary */}
      {analytics && (
        <div className="bg-gradient-to-r from-[#1a472a] to-[#1e3a5f] rounded-xl p-6 mb-8">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-[#a7a7a7] text-sm">Total Subscribers</p>
              <p className="text-white font-bold text-2xl">{formatNumber(analytics.totalSubscribers)}</p>
            </div>
            <div>
              <p className="text-[#a7a7a7] text-sm">Monthly Revenue</p>
              <p className="text-white font-bold text-2xl">${formatNumber(analytics.mrr)}</p>
            </div>
            <div>
              <p className="text-[#a7a7a7] text-sm">Active Tiers</p>
              <p className="text-white font-bold text-2xl">{tiers.length} / 3</p>
            </div>
          </div>
        </div>
      )}

      {/* Tiers List */}
      <div className="space-y-4">
        <h2 className="text-white font-bold text-lg">Your Tiers</h2>

        {tiers.length === 0 ? (
          <div className="bg-[#181818] rounded-xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#282828] rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-[#a7a7a7]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">No tiers yet</h3>
            <p className="text-[#a7a7a7] mb-4">
              Create your first subscription tier to start earning from your fans
            </p>
            <Button variant="primary" onClick={handleCreateTier}>
              Create Your First Tier
            </Button>
          </div>
        ) : (
          tiers.map((tier) => {
            const tierSubs = analytics?.subscribersByTier[tier.id] || 0;
            const tierRevenue = tierSubs * tier.priceMonthly;

            return (
              <div key={tier.id} className="bg-[#181818] rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-bold text-lg">{tier.name}</h3>
                        {tier.highlight && (
                          <Badge variant={tier.highlight === 'Most Popular' ? 'popular' : 'value'}>
                            {tier.highlight}
                          </Badge>
                        )}
                      </div>
                      <p className="text-[#a7a7a7] text-sm">{tier.tagline}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-xl">${tier.priceMonthly.toFixed(2)}</p>
                    <p className="text-[#a7a7a7] text-sm">per month</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-y border-[#282828]">
                  <div>
                    <p className="text-[#a7a7a7] text-sm">Subscribers</p>
                    <p className="text-white font-semibold">{formatNumber(tierSubs)}</p>
                  </div>
                  <div>
                    <p className="text-[#a7a7a7] text-sm">Revenue</p>
                    <p className="text-white font-semibold">${formatNumber(tierRevenue)}/mo</p>
                  </div>
                  <div>
                    <p className="text-[#a7a7a7] text-sm">Features</p>
                    <p className="text-white font-semibold">{tier.features.length}</p>
                  </div>
                </div>

                {/* Features Preview */}
                <div className="mb-4">
                  <p className="text-[#a7a7a7] text-sm mb-2">Included features:</p>
                  <div className="flex flex-wrap gap-2">
                    {tier.features.slice(0, 4).map((feature, i) => (
                      <span key={i} className="px-3 py-1 bg-[#282828] rounded-full text-white text-xs">
                        {feature}
                      </span>
                    ))}
                    {tier.features.length > 4 && (
                      <span className="px-3 py-1 bg-[#282828] rounded-full text-[#a7a7a7] text-xs">
                        +{tier.features.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button variant="secondary" size="sm" onClick={() => handleEditTier(tier)}>
                    Edit Tier
                  </Button>
                  <button
                    onClick={() => setShowDeleteConfirm(tier.id)}
                    className="px-4 py-2 text-[#e91429] text-sm font-medium hover:bg-[#e91429]/10 rounded-full transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Tips */}
      {tiers.length > 0 && tiers.length < 3 && (
        <div className="mt-8 bg-[#282828] rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#1ed760]/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#1ed760]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Tip: Add more tiers</h3>
              <p className="text-[#a7a7a7] text-sm">
                Artists with 3 tiers typically earn 40% more. Consider adding a lower-priced
                entry tier and a premium tier with exclusive perks.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tier Editor Modal */}
      <Modal
        isOpen={showTierEditor}
        onClose={() => {
          setShowTierEditor(false);
          setEditingTier(null);
        }}
        title={editingTier ? 'Edit Tier' : 'Create New Tier'}
      >
        <div className="p-6">
          <TierEditor
            tier={editingTier}
            artistId={currentArtist.id}
            onSave={handleSaveTier}
            onCancel={() => {
              setShowTierEditor(false);
              setEditingTier(null);
            }}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Delete Tier?"
      >
        <div className="p-6">
          <p className="text-[#a7a7a7] mb-6">
            Are you sure you want to delete this tier? Current subscribers will lose access
            to exclusive content at the end of their billing period.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)} className="flex-1">
              Cancel
            </Button>
            <button
              onClick={() => showDeleteConfirm && handleDeleteTier(showDeleteConfirm)}
              className="flex-1 px-6 py-3 bg-[#e91429] text-white font-bold rounded-full hover:bg-[#f01b2c]"
            >
              Delete Tier
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
