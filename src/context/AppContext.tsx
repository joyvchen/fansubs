'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  Artist,
  Tier,
  FanSubscription,
  ExclusiveContent,
  User,
  ArtistAnalytics,
  AppMode,
} from '@/types';
import {
  mockUser,
  mockArtists,
  mockTiers,
  mockExclusiveContent,
  mockAnalytics,
  mockSubscriptions,
} from '@/data/mockData';

interface AppContextType {
  // State
  mode: AppMode;
  currentUser: User;
  currentArtist: Artist | null;
  artists: Artist[];
  tiers: Tier[];
  subscriptions: FanSubscription[];
  exclusiveContent: ExclusiveContent[];
  analytics: ArtistAnalytics[];

  // Mode Actions
  setMode: (mode: AppMode) => void;
  setCurrentArtist: (artist: Artist | null) => void;

  // Subscription Actions
  subscribe: (artistId: string, tierId: string) => void;
  cancelSubscription: (artistId: string) => void;
  changeTier: (artistId: string, newTierId: string) => void;
  getSubscription: (artistId: string) => FanSubscription | null;
  getSubscribedArtists: () => Artist[];

  // Tier Actions
  getTiersForArtist: (artistId: string) => Tier[];
  getTierById: (tierId: string) => Tier | null;
  createTier: (tier: Omit<Tier, 'id'>) => Tier;
  updateTier: (tierId: string, updates: Partial<Tier>) => void;
  deleteTier: (tierId: string) => void;

  // Content Actions
  getContentForArtist: (artistId: string) => ExclusiveContent[];
  getAccessibleContent: (artistId: string) => ExclusiveContent[];
  canAccessContent: (content: ExclusiveContent) => boolean;
  createContent: (content: Omit<ExclusiveContent, 'id' | 'createdAt'>) => ExclusiveContent;

  // Analytics
  getAnalyticsForArtist: (artistId: string) => ArtistAnalytics | null;

  // Artist lookup
  getArtistById: (artistId: string) => Artist | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('listener');
  const [currentUser] = useState<User>(mockUser);
  const [currentArtist, setCurrentArtist] = useState<Artist | null>(mockArtists[0]);
  const [artists] = useState<Artist[]>(mockArtists);
  const [tiers, setTiers] = useState<Tier[]>(mockTiers);
  const [subscriptions, setSubscriptions] = useState<FanSubscription[]>(mockSubscriptions);
  const [exclusiveContent, setExclusiveContent] = useState<ExclusiveContent[]>(mockExclusiveContent);
  const [analytics] = useState<ArtistAnalytics[]>(mockAnalytics);

  // Subscription Actions
  const subscribe = useCallback((artistId: string, tierId: string) => {
    const existingSub = subscriptions.find(s => s.artistId === artistId && s.userId === currentUser.id);
    if (existingSub) {
      // Update existing subscription
      setSubscriptions(prev =>
        prev.map(s =>
          s.artistId === artistId && s.userId === currentUser.id
            ? { ...s, tierId, status: 'active' }
            : s
        )
      );
    } else {
      // Create new subscription
      const newSub: FanSubscription = {
        userId: currentUser.id,
        artistId,
        tierId,
        status: 'active',
        startDate: new Date().toISOString().split('T')[0],
      };
      setSubscriptions(prev => [...prev, newSub]);
    }
  }, [subscriptions, currentUser.id]);

  const cancelSubscription = useCallback((artistId: string) => {
    setSubscriptions(prev =>
      prev.map(s =>
        s.artistId === artistId && s.userId === currentUser.id
          ? { ...s, status: 'canceled' }
          : s
      )
    );
  }, [currentUser.id]);

  const changeTier = useCallback((artistId: string, newTierId: string) => {
    setSubscriptions(prev =>
      prev.map(s =>
        s.artistId === artistId && s.userId === currentUser.id
          ? { ...s, tierId: newTierId }
          : s
      )
    );
  }, [currentUser.id]);

  const getSubscription = useCallback((artistId: string): FanSubscription | null => {
    return subscriptions.find(
      s => s.artistId === artistId && s.userId === currentUser.id && s.status === 'active'
    ) || null;
  }, [subscriptions, currentUser.id]);

  const getSubscribedArtists = useCallback((): Artist[] => {
    const subscribedArtistIds = subscriptions
      .filter(s => s.userId === currentUser.id && s.status === 'active')
      .map(s => s.artistId);
    return artists.filter(a => subscribedArtistIds.includes(a.id));
  }, [subscriptions, currentUser.id, artists]);

  // Tier Actions
  const getTiersForArtist = useCallback((artistId: string): Tier[] => {
    return tiers.filter(t => t.artistId === artistId);
  }, [tiers]);

  const getTierById = useCallback((tierId: string): Tier | null => {
    return tiers.find(t => t.id === tierId) || null;
  }, [tiers]);

  const createTier = useCallback((tierData: Omit<Tier, 'id'>): Tier => {
    const newTier: Tier = {
      ...tierData,
      id: `tier-${Date.now()}`,
    };
    setTiers(prev => [...prev, newTier]);
    return newTier;
  }, []);

  const updateTier = useCallback((tierId: string, updates: Partial<Tier>) => {
    setTiers(prev =>
      prev.map(t => (t.id === tierId ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTier = useCallback((tierId: string) => {
    setTiers(prev => prev.filter(t => t.id !== tierId));
  }, []);

  // Content Actions
  const getContentForArtist = useCallback((artistId: string): ExclusiveContent[] => {
    return exclusiveContent.filter(c => c.artistId === artistId);
  }, [exclusiveContent]);

  const canAccessContent = useCallback((content: ExclusiveContent): boolean => {
    const subscription = getSubscription(content.artistId);
    if (!subscription || subscription.status !== 'active') return false;
    return content.tierAccess.includes(subscription.tierId);
  }, [getSubscription]);

  const getAccessibleContent = useCallback((artistId: string): ExclusiveContent[] => {
    const subscription = getSubscription(artistId);
    if (!subscription) return [];
    return exclusiveContent.filter(
      c => c.artistId === artistId && c.tierAccess.includes(subscription.tierId)
    );
  }, [exclusiveContent, getSubscription]);

  const createContent = useCallback((contentData: Omit<ExclusiveContent, 'id' | 'createdAt'>): ExclusiveContent => {
    const newContent: ExclusiveContent = {
      ...contentData,
      id: `content-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setExclusiveContent(prev => [...prev, newContent]);
    return newContent;
  }, []);

  // Analytics
  const getAnalyticsForArtist = useCallback((artistId: string): ArtistAnalytics | null => {
    return analytics.find(a => a.artistId === artistId) || null;
  }, [analytics]);

  // Artist lookup
  const getArtistById = useCallback((artistId: string): Artist | null => {
    return artists.find(a => a.id === artistId) || null;
  }, [artists]);

  const value: AppContextType = {
    mode,
    currentUser,
    currentArtist,
    artists,
    tiers,
    subscriptions,
    exclusiveContent,
    analytics,
    setMode,
    setCurrentArtist,
    subscribe,
    cancelSubscription,
    changeTier,
    getSubscription,
    getSubscribedArtists,
    getTiersForArtist,
    getTierById,
    createTier,
    updateTier,
    deleteTier,
    getContentForArtist,
    getAccessibleContent,
    canAccessContent,
    createContent,
    getAnalyticsForArtist,
    getArtistById,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
