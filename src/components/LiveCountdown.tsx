/**
 * Live Countdown Component
 * Shows remaining free preview time (5 minutes)
 * Triggers paywall when countdown reaches 0
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { theme } from '../theme/theme';
import { useStreamingStore } from '../stores/streamingStore';

interface LiveCountdownProps {
  containerStyle?: ViewStyle;
  onCountdownComplete?: () => void;
}

export const LiveCountdown: React.FC<LiveCountdownProps> = ({
  containerStyle,
  onCountdownComplete,
}) => {
  const { countdown, updateCountdown, triggerPaywall } = useStreamingStore();
  const [displayTime, setDisplayTime] = useState('5:00');

  useEffect(() => {
    const interval = setInterval(() => {
      const current = countdown.timeRemaining - 1000;
      
      if (current <= 0) {
        updateCountdown(0);
        clearInterval(interval);
        triggerPaywall();
        onCountdownComplete?.();
      } else {
        updateCountdown(current);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time as MM:SS
  useEffect(() => {
    const totalSeconds = Math.max(0, Math.floor(countdown.timeRemaining / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    setDisplayTime(
      `${minutes}:${seconds.toString().padStart(2, '0')}`
    );
  }, [countdown.timeRemaining]);

  const isWarning = countdown.timeRemaining < 60 * 1000; // less than 1 minute
  const isAlmostEnded = countdown.timeRemaining < 30 * 1000; // less than 30 seconds

  const getBackgroundColor = () => {
    if (isAlmostEnded) return theme.colors.error;
    if (isWarning) return theme.colors.warning;
    return theme.colors.orange.primary;
  };

  const getProgressPercentage = () => {
    const total = 5 * 60 * 1000;
    return (countdown.timeRemaining / total) * 100;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <View
          style={[
            styles.liveBadge,
            { backgroundColor: getBackgroundColor() },
          ]}
        >
          <Text style={[theme.textStyles.caption, styles.liveBadgeText]}>
            TRANSMISSÃO GRATUITA
          </Text>
        </View>
      </View>

      <View style={styles.countdownContainer}>
        <Text style={[theme.textStyles.h2, styles.countdownText]}>
          {displayTime}
        </Text>
        <Text style={[theme.textStyles.bodySmall, styles.countdownLabel]}>
          Minutos restantes gratuitos
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBar,
            {
              width: `${getProgressPercentage()}%`,
              backgroundColor: getBackgroundColor(),
            },
          ]}
        />
      </View>

      {isWarning && (
        <Text style={[theme.textStyles.bodySmall, styles.warningText]}>
          {isAlmostEnded
            ? 'A transmissão gratuita está terminando em breve!'
            : 'Menos de 1 minuto de transmissão gratuita'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.orange.primary,
  },
  header: {
    marginBottom: theme.spacing.md,
  },
  liveBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  liveBadgeText: {
    color: theme.colors.white,
    fontWeight: '600',
  },
  countdownContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  countdownText: {
    color: theme.colors.orange.primary,
    marginBottom: theme.spacing.sm,
    fontWeight: '700',
  },
  countdownLabel: {
    color: theme.colors.textSecondary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  progressBar: {
    height: '100%',
    borderRadius: theme.borderRadius.full,
  },
  warningText: {
    color: theme.colors.warning,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
});

export default LiveCountdown;