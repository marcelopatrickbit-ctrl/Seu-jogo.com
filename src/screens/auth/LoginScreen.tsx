/**
 * Login Screen
 * Email/Password authentication with email verification requirement
 */

import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { theme } from '../../theme/theme';
import { TextInput } from '../../components/TextInput';
import { Button } from '../../components/Button';
import { useAuthStore } from '../../stores/authStore';

export const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { login, isLoading } = useAuthStore();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
    }

    if (!password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await login({ email, password });
    } catch (error) {
      setErrors({ form: (error as Error).message });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={[theme.textStyles.h1, styles.title]}>
            seu jogo.com
          </Text>
          <Text style={[theme.textStyles.body, styles.subtitle]}>
            Transmita e assista jogos ao vivo
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {errors.form && (
            <View style={styles.errorBanner}>
              <Text style={[theme.textStyles.bodySmall, { color: theme.colors.white }]}>
                {errors.form}
              </Text>
            </View>
          )}

          <TextInput
            label="Email"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            editable={!isLoading}
          />

          <TextInput
            label="Senha"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
            editable={!isLoading}
          />

          <Button
            label="Entrar"
            variant="primary"
            size="large"
            fullWidth
            isLoading={isLoading}
            onPress={handleLogin}
            style={styles.loginButton}
          />
        </View>

        {/* Footer Links */}
        <View style={styles.footer}>
          <Text style={[theme.textStyles.bodySmall, styles.footerText]}>
            Não tem conta?{' '}
            <Text style={[{ color: theme.colors.orange.primary, fontWeight: '600' }]}>
              Criar conta
            </Text>
          </Text>
          <Text style={[theme.textStyles.bodySmall, styles.footerLink]}>
            Esqueceu a senha?
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.lg,
  },
  title: {
    color: theme.colors.orange.primary,
    marginBottom: theme.spacing.sm,
    fontWeight: '700',
  },
  subtitle: {
    color: theme.colors.textSecondary,
  },
  form: {
    marginVertical: theme.spacing.xl,
  },
  errorBanner: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  loginButton: {
    marginTop: theme.spacing.lg,
  },
  footer: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  footerText: {
    color: theme.colors.textSecondary,
  },
  footerLink: {
    color: theme.colors.orange.primary,
    fontWeight: '600',
  },
});

export default LoginScreen;