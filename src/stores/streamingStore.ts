/**
 * Zustand Store for Streaming/Playback State
 * Manages: free preview countdown, paywall trigger, payment state
 */

import { create } from 'zustand';
import { StreamingState, CountdownState } from '../types';

interface StreamingStore extends StreamingState {
  countdown: CountdownState;
  paymentProcessing: boolean;
  paymentError: string | null;

  // Actions
  updateStreamState: (state: Partial<StreamingState>) => void;
  updateCountdown: (timeRemaining: number) => void;
  startCountdown: () => void;
  stopCountdown: () => void;
  triggerPaywall: () => void;
  setPaymentProcessing: (processing: boolean) => void;
  setPaymentError: (error: string | null) => void;
  resetStream: () => void;
}

const INITIAL_COUNTDOWN = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useStreamingStore = create<StreamingStore>((set) => ({
  // StreamingState
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  isLoading: false,
  error: undefined,
  freePreviewEnded: false,
  shouldShowPaywall: false,

  // CountdownState
  countdown: {
    timeRemaining: INITIAL_COUNTDOWN,
    isActive: false,
    hasEnded: false,
  },

  // Payment
  paymentProcessing: false,
  paymentError: null,

  // Actions
  updateStreamState: (state) => {
    set((current) => ({
      ...current,
      ...state,
    }));
  },

  updateCountdown: (timeRemaining) => {
    const hasEnded = timeRemaining <= 0;
    
    set((current) => ({
      countdown: {
        timeRemaining: Math.max(0, timeRemaining),
        isActive: !hasEnded && current.countdown.isActive,
        hasEnded,
      },
      freePreviewEnded: hasEnded,
      shouldShowPaywall: hasEnded,
    }));
  },

  startCountdown: () => {
    set((current) => ({
      countdown: {
        ...current.countdown,
        isActive: true,
      },
    }));
  },

  stopCountdown: () => {
    set((current) => ({
      countdown: {
        ...current.countdown,
        isActive: false,
      },
    }));
  },

  triggerPaywall: () => {
    set({
      shouldShowPaywall: true,
      isPlaying: false,
    });
  },

  setPaymentProcessing: (processing) => {
    set({ paymentProcessing: processing });
  },

  setPaymentError: (error) => {
    set({ paymentError: error });
  },

  resetStream: () => {
    set({
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      isLoading: false,
      error: undefined,
      freePreviewEnded: false,
      shouldShowPaywall: false,
      countdown: {
        timeRemaining: INITIAL_COUNTDOWN,
        isActive: false,
        hasEnded: false,
      },
      paymentProcessing: false,
      paymentError: null,
    });
  },
}));