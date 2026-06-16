/**
 * Register Screen
 * User registration with email verification requirement
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

export const RegisterScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { register, isLoading } = useAuthStore();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

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

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Senhas não conferem';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register({
        name,
        email,
        password,
        confirmPassword,
      });
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
            Criar Conta
          </Text>
          <Text style={[theme.textStyles.body, styles.subtitle]}>
            Junte-se a seu jogo.com agora
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
            label="Nome completo"
            placeholder="Seu nome"
            value={name}
            onChangeText={setName}
            error={errors.name}
            editable={!isLoading}
          />

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

          <TextInput
            label="Confirmar senha"
            placeholder="••••••••"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
            editable={!isLoading}
          />

          <Button
            label="Criar Conta"
            variant="primary"
            size="large"
            fullWidth
            isLoading={isLoading}
            onPress={handleRegister}
            style={styles.registerButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[theme.textStyles.bodySmall, styles.footerText]}>
            Ao criar uma conta, você concorda com nossos{' '}
            <Text style={{ color: theme.colors.orange.primary }}>
              Termos de Serviço
            </Text>
          </Text>
          <Text style={[theme.textStyles.bodySmall, styles.footerLink]}>
            Já tem conta? <Text style={{ fontWeight: '600' }}>Entrar</Text>
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
    marginVertical: theme.spacing.md,
  },
  errorBanner: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  registerButton: {
    marginTop: theme.spacing.lg,
  },
  footer: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  footerText: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  footerLink: {
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default RegisterScreen;