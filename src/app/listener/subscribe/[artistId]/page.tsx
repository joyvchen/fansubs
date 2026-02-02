'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Button, Badge, FeatureList, Modal } from '@/components/ui';
import { TierCard } from '@/components/listener';

interface SubscribePageProps {
  params: Promise<{ artistId: string }>;
}

export default function SubscribePage({ params }: SubscribePageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    getArtistById,
    getTiersForArtist,
    getSubscription,
    getTierById,
    subscribe,
    cancelSubscription,
    changeTier,
  } = useApp();

  const preselectedTier = searchParams.get('tier');
  const [selectedTierId, setSelectedTierId] = useState<string | null>(preselectedTier);
  const [step, setStep] = useState<'select' | 'checkout' | 'success' | 'manage'>('select');
  const [showCancelModal, setShowCancelModal] = useState(false);

  const artist = getArtistById(resolvedParams.artistId);
  const tiers = getTiersForArtist(resolvedParams.artistId);
  const subscription = getSubscription(resolvedParams.artistId);
  const currentTier = subscription ? getTierById(subscription.tierId) : null;
  const selectedTier = selectedTierId ? getTierById(selectedTierId) : null;

  useEffect(() => {
    if (subscription) {
      setStep('manage');
      setSelectedTierId(subscription.tierId);
    }
  }, [subscription]);

  if (!artist) {
    return (
      <div className="mobile-container flex items-center justify-center min-h-screen">
        <p className="text-white">Artist not found</p>
      </div>
    );
  }

  const handleSelectTier = (tierId: string) => {
    setSelectedTierId(tierId);
  };

  const handleContinueToCheckout = () => {
    if (selectedTierId) {
      setStep('checkout');
    }
  };

  const handleSubscribe = () => {
    if (selectedTierId) {
      subscribe(resolvedParams.artistId, selectedTierId);
      setStep('success');
    }
  };

  const handleChangeTier = () => {
    if (selectedTierId && subscription) {
      changeTier(resolvedParams.artistId, selectedTierId);
      setStep('success');
    }
  };

  const handleCancel = () => {
    cancelSubscription(resolvedParams.artistId);
    setShowCancelModal(false);
    router.push(`/listener/artist/${artist.id}`);
  };

  // Tier Selection Step
  if (step === 'select') {
    return (
      <div className="mobile-container pb-32">
        {/* Header */}
        <div className="sticky top-0 bg-[#121212]/95 backdrop-blur-sm z-10 px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="ml-4 text-white font-bold text-lg">Subscribe to {artist.name}</h1>
        </div>

        {/* Artist Preview */}
        <div className="px-4 py-6 flex items-center gap-4 border-b border-[#282828]">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
            {artist.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">{artist.name}</h2>
            <p className="text-[#a7a7a7] text-sm">Choose a subscription tier</p>
          </div>
        </div>

        {/* Tier Cards */}
        <div className="px-4 py-6 space-y-4">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`cursor-pointer transition-all ${
                selectedTierId === tier.id
                  ? 'ring-2 ring-[#1ed760] rounded-xl'
                  : ''
              }`}
              onClick={() => handleSelectTier(tier.id)}
            >
              <TierCard tier={tier} />
            </div>
          ))}
        </div>

        {/* Fixed CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent pt-6 pb-6 px-4">
          <div className="max-w-[375px] mx-auto">
            <Button
              variant="primary"
              fullWidth
              disabled={!selectedTierId}
              onClick={handleContinueToCheckout}
              className={selectedTierId ? 'glow-green' : ''}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Checkout Step
  if (step === 'checkout' && selectedTier) {
    return (
      <div className="mobile-container pb-32">
        {/* Header */}
        <div className="sticky top-0 bg-[#121212]/95 backdrop-blur-sm z-10 px-4 py-4 flex items-center">
          <button
            onClick={() => setStep('select')}
            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="ml-4 text-white font-bold text-lg">Confirm subscription</h1>
        </div>

        {/* Order Summary */}
        <div className="px-4 py-6">
          <div className="bg-[#181818] rounded-xl p-4 mb-6">
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#282828]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {artist.name.charAt(0)}
              </div>
              <div>
                <p className="text-white font-semibold">{artist.name}</p>
                <p className="text-[#a7a7a7] text-sm">{selectedTier.name} subscription</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[#a7a7a7]">{selectedTier.name} tier</span>
                <span className="text-white">${selectedTier.priceMonthly.toFixed(2)}/mo</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-[#282828]">
                <span className="text-white font-semibold">Total today</span>
                <span className="text-white font-semibold">${selectedTier.priceMonthly.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* What You Get */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">What you&apos;ll get</h3>
            <div className="bg-[#181818] rounded-xl p-4">
              <FeatureList features={selectedTier.features} variant="compact" />
            </div>
          </div>

          {/* Payment Method (Mock) */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">Payment method</h3>
            <div className="bg-[#181818] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 bg-[#1a1f71] rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <span className="text-white text-sm">•••• 4242</span>
              </div>
              <button className="text-[#1ed760] text-sm font-medium">Change</button>
            </div>
          </div>

          {/* Terms */}
          <p className="text-[#a7a7a7] text-xs text-center">
            By subscribing, you agree to the Terms of Service and Privacy Policy.
            You&apos;ll be charged ${selectedTier.priceMonthly.toFixed(2)}/month until you cancel.
          </p>
        </div>

        {/* Fixed CTA */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent pt-6 pb-6 px-4">
          <div className="max-w-[375px] mx-auto">
            <Button
              variant="primary"
              fullWidth
              onClick={handleSubscribe}
              className="glow-green"
            >
              Subscribe — ${selectedTier.priceMonthly.toFixed(2)}/mo
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Success Step
  if (step === 'success' && selectedTier) {
    return (
      <div className="mobile-container flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center animate-scale-in">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-[#1ed760] rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-white font-bold text-2xl mb-2">You&apos;re subscribed!</h1>
          <p className="text-[#a7a7a7] mb-2">
            Welcome to {artist.name}&apos;s {selectedTier.name} tier
          </p>
          <Badge variant="subscriber">Subscriber</Badge>

          <div className="mt-8 space-y-3">
            <Button
              variant="primary"
              fullWidth
              onClick={() => router.push(`/listener/artist/${artist.id}`)}
            >
              View Exclusive Content
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => router.push('/listener/home')}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Manage Subscription Step
  if (step === 'manage' && currentTier) {
    const isChangingTier = selectedTierId !== subscription?.tierId;

    return (
      <div className="mobile-container pb-32">
        {/* Header */}
        <div className="sticky top-0 bg-[#121212]/95 backdrop-blur-sm z-10 px-4 py-4 flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="ml-4 text-white font-bold text-lg">Manage Subscription</h1>
        </div>

        {/* Current Plan */}
        <div className="px-4 py-6 border-b border-[#282828]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#535353] to-[#282828] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
              {artist.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">{artist.name}</h2>
              <div className="flex items-center gap-2">
                <Badge variant="subscriber">{currentTier.name}</Badge>
                <span className="text-[#a7a7a7] text-sm">
                  ${currentTier.priceMonthly.toFixed(2)}/mo
                </span>
              </div>
            </div>
          </div>
          <p className="text-[#a7a7a7] text-sm">
            Member since {subscription?.startDate}
          </p>
        </div>

        {/* Change Tier */}
        <div className="px-4 py-6">
          <h3 className="text-white font-semibold mb-4">Change your plan</h3>
          <div className="space-y-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`cursor-pointer transition-all rounded-xl ${
                  selectedTierId === tier.id
                    ? 'ring-2 ring-[#1ed760]'
                    : ''
                }`}
                onClick={() => setSelectedTierId(tier.id)}
              >
                <TierCard
                  tier={tier}
                  isCurrentTier={tier.id === subscription?.tierId}
                  compact
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cancel */}
        <div className="px-4 py-6 border-t border-[#282828]">
          <button
            onClick={() => setShowCancelModal(true)}
            className="text-[#e91429] text-sm font-medium"
          >
            Cancel subscription
          </button>
        </div>

        {/* Fixed CTA */}
        {isChangingTier && selectedTier && (
          <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#121212] via-[#121212] to-transparent pt-6 pb-6 px-4">
            <div className="max-w-[375px] mx-auto">
              <Button
                variant="primary"
                fullWidth
                onClick={handleChangeTier}
                className="glow-green"
              >
                {selectedTier.priceMonthly > currentTier.priceMonthly ? 'Upgrade' : 'Change'} to {selectedTier.name}
              </Button>
            </div>
          </div>
        )}

        {/* Cancel Modal */}
        <Modal isOpen={showCancelModal} onClose={() => setShowCancelModal(false)} title="Cancel subscription?">
          <div className="p-6">
            <p className="text-[#a7a7a7] mb-6">
              You&apos;ll lose access to all exclusive content from {artist.name} when your current billing period ends.
            </p>
            <div className="space-y-3">
              <Button variant="secondary" fullWidth onClick={() => setShowCancelModal(false)}>
                Keep subscription
              </Button>
              <button
                onClick={handleCancel}
                className="w-full py-3 text-[#e91429] font-semibold text-sm"
              >
                Cancel subscription
              </button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  return null;
}
