import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import { Search, Sparkles, type LucideIcon } from 'lucide-react-native';

interface EmptyStateProps {
  icon?: LucideIcon | string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon = Search,
  title,
  subtitle,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  const isLucideIcon = typeof icon !== 'string';
  const IconComponent = isLucideIcon ? icon : null;

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        {IconComponent ? (
          <IconComponent size={26} color={Colors.primarySage} strokeWidth={2} />
        ) : (
          <Text style={styles.rawIcon}>{icon as string}</Text>
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {actionLabel && onAction && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onAction}
          activeOpacity={0.8}
          accessibilityRole="button"
        >
          <Text style={styles.actionText}>{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.primarySage} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
}

interface StatusBadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'info' | 'neutral';
  icon?: LucideIcon;
}

export function StatusBadge({ label, variant = 'neutral', icon: IconComponent }: StatusBadgeProps) {
  const getColors = () => {
    switch (variant) {
      case 'success':
        return { bg: Colors.successBg, text: Colors.success, icon: Colors.success };
      case 'warning':
        return { bg: Colors.warningBg, text: Colors.warning, icon: Colors.warning };
      case 'info':
        return { bg: Colors.primaryLight, text: Colors.primarySage, icon: Colors.primarySage };
      default:
        return { bg: Colors.surfaceMuted, text: Colors.textSecondary, icon: Colors.textSecondary };
    }
  };

  const colors = getColors();

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      {IconComponent && <IconComponent size={12} color={colors.icon} strokeWidth={2.5} />}
      <Text style={[styles.badgeText, { color: colors.text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    minHeight: 220,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  rawIcon: {
    fontSize: 24,
  },
  title: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  subtitle: {
    fontSize: Typography.secondary.fontSize,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 280,
  },
  actionButton: {
    marginTop: Spacing.md,
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primarySage,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  actionText: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.primarySage,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.base,
    color: Colors.textSecondary,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    includeFontPadding: false,
  },
});
