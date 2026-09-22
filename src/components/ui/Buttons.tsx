import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import type { LucideIcon } from 'lucide-react-native';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: LucideIcon | string;
}

export function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  fullWidth = true,
  icon,
}: ButtonProps) {
  const isLucideIcon = typeof icon !== 'string' && icon !== undefined;
  const IconComponent = isLucideIcon ? icon : null;

  return (
    <TouchableOpacity
      style={[styles.button, fullWidth && styles.fullWidth, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color={Colors.white} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {IconComponent && <IconComponent size={18} color={Colors.white} strokeWidth={2} />}
          {typeof icon === 'string' && <Text style={styles.rawIcon}>{icon}</Text>}
          <Text style={styles.label}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function SecondaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  fullWidth = true,
  icon,
}: ButtonProps) {
  const isLucideIcon = typeof icon !== 'string' && icon !== undefined;
  const IconComponent = isLucideIcon ? icon : null;

  return (
    <TouchableOpacity
      style={[styles.secondaryButton, fullWidth && styles.fullWidth, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator color={Colors.primarySage} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {IconComponent && <IconComponent size={18} color={Colors.primarySage} strokeWidth={2} />}
          {typeof icon === 'string' && <Text style={styles.rawIcon}>{icon}</Text>}
          <Text style={styles.secondaryLabel}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function TertiaryButton({
  label,
  onPress,
  disabled = false,
  icon,
}: ButtonProps) {
  const isLucideIcon = typeof icon !== 'string' && icon !== undefined;
  const IconComponent = isLucideIcon ? icon : null;

  return (
    <TouchableOpacity
      style={[styles.tertiaryButton, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      accessibilityRole="button"
    >
      <View style={styles.contentRow}>
        {IconComponent && <IconComponent size={16} color={Colors.primarySage} strokeWidth={2} />}
        {typeof icon === 'string' && <Text style={styles.rawIcon}>{icon}</Text>}
        <Text style={styles.tertiaryLabel}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primarySage,
    borderRadius: Radius.lg,
    height: 48,
    minHeight: 48,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    height: 48,
    minHeight: 48,
    paddingHorizontal: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primarySage,
  },
  tertiaryButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontSize: Typography.buttonText.fontSize,
    fontWeight: Typography.buttonText.fontWeight,
    color: Colors.white,
    includeFontPadding: false,
  },
  secondaryLabel: {
    fontSize: Typography.buttonText.fontSize,
    fontWeight: Typography.buttonText.fontWeight,
    color: Colors.primarySage,
    includeFontPadding: false,
  },
  tertiaryLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.primarySage,
    includeFontPadding: false,
  },
  rawIcon: {
    fontSize: 16,
  },
});
