/**
 * Payment Paywall Component
 * Shows after 5-minute free preview
 * Displays PIX payment option for R$ 2.50
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../theme/theme';
import { Button } from './Button';

interface PaymentPaywallProps {
  visible: boolean;
  gameTitle: string;
  price: number;
  onPaymentPress: () => void;
  onClose: () => void;
  isProcessing?: boolean;
  containerStyle?: ViewStyle;
}

export const PaymentPaywall: React.FC<PaymentPaywallProps> = ({
  visible,
  gameTitle,
  price,
  onPaymentPress,
  onClose,
  isProcessing = false,
  containerStyle,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={[styles.container, containerStyle]}>
          {/* Header */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            disabled={isProcessing}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {/* Icon */}
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🎮</Text>
          </View>

          {/* Title */}
          <Text style={[theme.textStyles.h2, styles.title]}>
            Continuar assistindo
          </Text>

          {/* Description */}
          <Text style={[theme.textStyles.body, styles.description]}>
            A transmissão gratuita de {gameTitle} terminou. Pague agora para continuar assistindo até o final!
          </Text>

          {/* Price Card */}
          <View style={styles.priceCard}>
            <Text style={[theme.textStyles.bodySmall, styles.priceLabel]}>
              Valor
            </Text>
            <Text style={[theme.textStyles.h1, styles.price]}>
              R$ {price.toFixed(2)}
            </Text>
            <Text style={[theme.textStyles.caption, styles.priceNote]}>
              Acesso até o final da partida
            </Text>
          </View>

          {/* Payment Methods */}
          <View style={styles.paymentMethods}>
            <Text style={[theme.textStyles.label, styles.methodsTitle]}>
              Método de pagamento
            </Text>

            {/* PIX Option */}
            <TouchableOpacity
              style={[
                styles.methodButton,
                paymentMethod === 'pix' && styles.methodButtonActive,
              ]}
              onPress={() => setPaymentMethod('pix')}
              disabled={isProcessing}
            >
              <View
                style={[
                  styles.methodRadio,
                  paymentMethod === 'pix' && styles.methodRadioActive,
                ]}
              >
                {paymentMethod === 'pix' && (
                  <View style={styles.methodRadioDot} />
                )}
              </View>
              <View style={styles.methodContent}>
                <Text style={[theme.textStyles.bodySmall, styles.methodName]}>
                  PIX
                </Text>
                <Text style={[theme.textStyles.caption, styles.methodDescription]}>
                  Pagamento instantâneo
                </Text>
              </View>
            </TouchableOpacity>

            {/* Card Option */}
            <TouchableOpacity
              style={[
                styles.methodButton,
                paymentMethod === 'card' && styles.methodButtonActive,
              ]}
              onPress={() => setPaymentMethod('card')}
              disabled={isProcessing}
            >
              <View
                style={[
                  styles.methodRadio,
                  paymentMethod === 'card' && styles.methodRadioActive,
                ]}
              >
                {paymentMethod === 'card' && (
                  <View style={styles.methodRadioDot} />
                )}
              </View>
              <View style={styles.methodContent}>
                <Text style={[theme.textStyles.bodySmall, styles.methodName]}>
                  Cartão de Crédito
                </Text>
                <Text style={[theme.textStyles.caption, styles.methodDescription]}>
                  Crédito/Débito
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* CTA Button */}
          <Button
            label={`Pagar com ${paymentMethod === 'pix' ? 'PIX' : 'Cartão'}`}
            variant="primary"
            size="large"
            fullWidth
            onPress={onPaymentPress}
            isLoading={isProcessing}
            style={styles.payButton}
          />

          {/* Security Badge */}
          <View style={styles.securityBadge}>
            <Text style={styles.securityIcon}>🔒</Text>
            <Text style={[theme.textStyles.caption, styles.securityText]}>
              Pagamento 100% seguro
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    maxHeight: '90%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  closeButtonText: {
    fontSize: 24,
    color: theme.colors.textSecondary,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  icon: {
    fontSize: 48,
  },
  title: {
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  description: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  priceCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderWidth: 2,
    borderColor: theme.colors.orange.primary,
    alignItems: 'center',
  },
  priceLabel: {
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  price: {
    color: theme.colors.orange.primary,
    marginBottom: theme.spacing.sm,
  },
  priceNote: {
    color: theme.colors.textDisabled,
  },
  paymentMethods: {
    marginBottom: theme.spacing.lg,
  },
  methodsTitle: {
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  methodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  methodButtonActive: {
    borderColor: theme.colors.orange.primary,
    backgroundColor: theme.colors.surfaceVariant,
  },
  methodRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodRadioActive: {
    borderColor: theme.colors.orange.primary,
  },
  methodRadioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.orange.primary,
  },
  methodContent: {
    flex: 1,
  },
  methodName: {
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  methodDescription: {
    color: theme.colors.textSecondary,
  },
  payButton: {
    marginBottom: theme.spacing.lg,
  },
  securityBadge: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
  },
  securityIcon: {
    fontSize: 16,
    marginRight: theme.spacing.sm,
  },
  securityText: {
    color: theme.colors.textSecondary,
  },
});

export default PaymentPaywall;