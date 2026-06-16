/**
 * Master Theme Object for seu jogo.com
 */

import { colors } from './colors';
import { typography, textStyles } from './typography';
import { spacing, borderRadius, shadows } from './spacing';

export const theme = {
  colors,
  typography,
  textStyles,
  spacing,
  borderRadius,
  shadows,

  // Feature Configuration
  features: {
    freePreviewDuration: 5 * 60 * 1000, // 5 minutes in milliseconds
    paywall: {
      price: 2.5,
      currency: 'BRL',
      method: 'PIX',
    },
    animations: {
      fast: 150,
      normal: 300,
      slow: 500,
    },
  },
};

export type Theme = typeof theme;