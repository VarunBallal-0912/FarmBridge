import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import { ChevronRight, type LucideIcon } from 'lucide-react-native';

interface QuickActionCardProps {
  icon: LucideIcon | string;
  title: string;
  subtitle: string;
  onPress?: () => void;
  accentColor?: string;
  size?: 'normal' | 'large';
}

export function QuickActionCard({
  icon,
  title,
  subtitle,
  onPress,
  accentColor = Colors.primarySage,
  size = 'normal',
}: QuickActionCardProps) {
  const isLucideIcon = typeof icon !== 'string';
  const IconComponent = isLucideIcon ? icon : null;

  return (
    <TouchableOpacity
      style={[styles.card, size === 'large' && styles.largeCard]}
      onPress={onPress}
      activeOpacity={0.8}
      accessibilityRole="button"
    >
      <View style={styles.topRow}>
        <View style={[styles.iconContainer, { backgroundColor: accentColor + '18' }]}>
          {IconComponent ? (
            <IconComponent size={22} color={accentColor} strokeWidth={2} />
          ) : (
            <Text style={styles.rawIcon}>{icon as string}</Text>
          )}
        </View>
        <ChevronRight size={16} color={Colors.textMuted} />
      </View>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.card,
  },
  largeCard: {
    padding: Spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rawIcon: {
    fontSize: 20,
  },
  title: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    marginBottom: 3,
  },
  subtitle: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
});
