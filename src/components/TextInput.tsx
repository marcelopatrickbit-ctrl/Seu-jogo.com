/**
 * TextInput Component - Form Input with Dark Theme
 */

import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  View,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme/theme';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
}

export const TextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? theme.colors.error
    : isFocused
    ? theme.colors.orange.primary
    : theme.colors.border;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[theme.textStyles.label, styles.label]}>
          {label}
        </Text>
      )}
      
      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            borderWidth: isFocused ? 2 : 1,
          },
        ]}
      >
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        
        <RNTextInput
          {...props}
          style={[theme.textStyles.body, styles.input]}
          placeholderTextColor={theme.colors.textDisabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {rightIcon && (
          <TouchableOpacity
            style={styles.iconRight}
            onPress={onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={[theme.textStyles.caption, styles.error]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    color: theme.colors.text,
  },
  iconLeft: {
    marginRight: theme.spacing.sm,
  },
  iconRight: {
    marginLeft: theme.spacing.sm,
    padding: theme.spacing.sm,
  },
  error: {
    marginTop: theme.spacing.sm,
    color: theme.colors.error,
  },
});

export default TextInput;