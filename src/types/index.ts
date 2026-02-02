export interface Artist {
  id: string;
  name: string;
  verified: boolean;
  monthlyListeners: number;
  imageUrl: string;
  headerImageUrl: string;
  subscriptionsEnabled: boolean;
  bio: string;
  genre: string;
  latestAlbum: string;
  latestAlbumDate: string;
  label: string;
  members: string[];
}

export interface Tier {
  id: string;
  artistId: string;
  name: string;
  priceMonthly: number;
  tagline: string;
  description: string;
  features: string[];
  contentPreview: ContentPreview[];
  highlight?: 'Most Popular' | 'Best Value' | null;
}

export interface ContentPreview {
  type: 'clip' | 'playlist' | 'merch' | 'early-access';
  title: string;
  thumbnail?: string;
}

export interface FanSubscription {
  userId: string;
  artistId: string;
  tierId: string;
  status: 'active' | 'canceled';
  startDate: string;
}

export interface ExclusiveContent {
  id: string;
  artistId: string;
  type: 'clip' | 'playlist' | 'audio-message' | 'artist-pick' | 'early-release' | 'merch-code';
  title: string;
  description: string;
  tierAccess: string[];
  thumbnailUrl?: string;
  createdAt: string;
  content?: string; // For merch codes, audio URLs, etc.
}

export interface User {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

export interface ArtistAnalytics {
  artistId: string;
  totalSubscribers: number;
  mrr: number;
  churnRate: number;
  subscribersByTier: { [tierId: string]: number };
  revenueHistory: { month: string; revenue: number }[];
  newSubscribersThisMonth: number;
  canceledThisMonth: number;
}

export type AppMode = 'listener' | 'artist';

export interface AppState {
  mode: AppMode;
  currentUser: User;
  currentArtist: Artist | null;
  artists: Artist[];
  tiers: Tier[];
  subscriptions: FanSubscription[];
  exclusiveContent: ExclusiveContent[];
  analytics: ArtistAnalytics[];
}
