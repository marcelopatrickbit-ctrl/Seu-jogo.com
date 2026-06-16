/**
 * Global TypeScript Types for seu jogo.com
 */

// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isEmailVerified: boolean;
  createdAt: Date;
  isAdmin: boolean;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends AuthCredentials {
  name: string;
  confirmPassword: string;
}

// Game/Stream Types
export interface Game {
  id: string;
  title: string;
  description: string;
  posterImage: string;
  streamUrl: string;
  scheduledAt: Date;
  duration?: number; // in minutes
  status: 'scheduled' | 'live' | 'ended';
  viewers: number;
  price: number; // 2.5 BRL
  isLive: boolean;
  hasEnded: boolean;
  createdBy: string; // admin user ID
  createdAt: Date;
  updatedAt: Date;
}

export interface DailyAnnouncement {
  id: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  displayUntil: Date;
}

// Payment Types
export interface PaymentTransaction {
  id: string;
  userId: string;
  gameId: string;
  amount: number;
  currency: string;
  method: 'pix' | 'card' | 'wallet';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  pixQrCode?: string;
  pixCopyPaste?: string;
  createdAt: Date;
  completedAt?: Date;
}

// Watch History Types
export interface WatchHistory {
  id: string;
  userId: string;
  gameId: string;
  watchedAt: Date;
  duration: number; // in seconds
  isPaid: boolean;
}

// Streaming/Playback Types
export interface StreamingState {
  isPlaying: boolean;
  currentTime: number; // in milliseconds
  duration: number; // in milliseconds
  isLoading: boolean;
  error?: string;
  freePreviewEnded: boolean;
  shouldShowPaywall: boolean;
}

export interface CountdownState {
  timeRemaining: number; // in milliseconds
  isActive: boolean;
  hasEnded: boolean;
}

// Admin Panel Types
export interface AdminGameInput {
  title: string;
  description: string;
  posterImage: string;
  streamUrl: string;
  scheduledAt: Date;
  duration?: number;
}

export interface AdminAnnouncementInput {
  content: string;
  imageUrl?: string;
  displayUntil: Date;
}

// Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
}