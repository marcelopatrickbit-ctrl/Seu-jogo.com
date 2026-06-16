/**
 * Typography System for seu jogo.com
 */

import { StyleSheet } from 'react-native';

export const typography = {
  fontFamily: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    bold: 'Inter_700Bold',
  },
  
  sizes: {
    h1: 32,
    h2: 24,
    h3: 20,
    body: 16,
    bodySmall: 14,
    caption: 12,
    tiny: 10,
  },

  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const textStyles = StyleSheet.create({
  h1: {
    fontSize: typography.sizes.h1,
    fontWeight: typography.weights.bold,
    lineHeight: typography.sizes.h1 * typography.lineHeights.tight,
    fontFamily: typography.fontFamily.bold,
  },
  h2: {
    fontSize: typography.sizes.h2,
    fontWeight: typography.weights.bold,
    lineHeight: typography.sizes.h2 * typography.lineHeights.tight,
    fontFamily: typography.fontFamily.bold,
  },
  h3: {
    fontSize: typography.sizes.h3,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.sizes.h3 * typography.lineHeights.normal,
    fontFamily: typography.fontFamily.medium,
  },
  body: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.body * typography.lineHeights.normal,
    fontFamily: typography.fontFamily.regular,
  },
  bodySmall: {
    fontSize: typography.sizes.bodySmall,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.bodySmall * typography.lineHeights.normal,
    fontFamily: typography.fontFamily.regular,
  },
  caption: {
    fontSize: typography.sizes.caption,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.caption * typography.lineHeights.normal,
    fontFamily: typography.fontFamily.regular,
  },
  tiny: {
    fontSize: typography.sizes.tiny,
    fontWeight: typography.weights.regular,
    lineHeight: typography.sizes.tiny * typography.lineHeights.tight,
    fontFamily: typography.fontFamily.regular,
  },
  
  // Button text
  buttonLarge: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.sizes.body * typography.lineHeights.normal,
    fontFamily: typography.fontFamily.medium,
  },
  buttonSmall: {
    fontSize: typography.sizes.bodySmall,
    fontWeight: typography.weights.semibold,
    lineHeight: typography.sizes.bodySmall * typography.lineHeights.normal,
    fontFamily: typography.fontFamily.medium,
  },
  
  // Label
  label: {
    fontSize: typography.sizes.bodySmall,
    fontWeight: typography.weights.medium,
    lineHeight: typography.sizes.bodySmall * typography.lineHeights.normal,
    fontFamily: typography.fontFamily.medium,
  },
});