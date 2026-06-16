/**
 * Color System for seu jogo.com
 * Dark-First Utility with Electric Orange accent
 */

export const colors = {
  // Primary Obsidian
  obsidian: {
    dark: '#0A0E27',
    medium: '#1a1f3a',
    light: '#2d3250',
  },

  // Electric Orange Accent
  orange: {
    primary: '#FF6B35',
    hover: '#E85A25',
    light: '#FFB380',
    disabled: '#FF6B3580',
  },

  // Semantic
  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',

  // Neutral
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    light: '#F5F5F5',
    medium: '#9E9E9E',
    dark: '#424242',
  },

  // Functional
  background: '#0A0E27',
  surface: '#1a1f3a',
  surfaceVariant: '#2d3250',
  border: '#3d4460',
  text: '#FFFFFF',
  textSecondary: '#B0B5C8',
  textDisabled: '#7A7F94',

  // Live & Streaming
  live: '#FF6B35',
  liveIndicator: '#FF6B35',
  streaming: '#FF6B35',
  paused: '#9E9E9E',

  // Payment/Paywall
  paywall: '#FF6B35',
  freeTrial: '#4CAF50',
};

export type Colors = typeof colors;