/**
 * Button Component - Primary UI Control
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { theme } from '../theme/theme';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  style,
  ...props
}) => {
  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
      },
      medium: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
      },
      large: {
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
      },
    };

    // Variant
    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: disabled ? theme.colors.orange.disabled : theme.colors.orange.primary,
      },
      secondary: {
        backgroundColor: theme.colors.surfaceVariant,
        borderWidth: 1,
        borderColor: theme.colors.orange.primary,
      },
      danger: {
        backgroundColor: theme.colors.error,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    // Width
    const widthStyle = fullWidth ? { width: '100%' } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...widthStyle,
      opacity: disabled ? 0.6 : 1,
    };
  };

  const getTextStyle = (): TextStyle => {
    const variantTextColors: Record<string, string> = {
      primary: theme.colors.white,
      secondary: theme.colors.orange.primary,
      danger: theme.colors.white,
      ghost: theme.colors.orange.primary,
    };

    const sizeTextStyles: Record<string, TextStyle> = {
      small: theme.textStyles.buttonSmall,
      medium: theme.textStyles.buttonLarge,
      large: theme.textStyles.buttonLarge,
    };

    return {
      ...sizeTextStyles[size],
      color: variantTextColors[variant],
    };
  };

  return (
    <TouchableOpacity
      {...props}
      style={[getContainerStyle(), style]}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      <Text style={getTextStyle()}>
        {isLoading ? 'Carregando...' : label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default Button;