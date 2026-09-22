import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';

interface QuickActionCardProps {
  icon: string;
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
  accentColor = Colors.lightGreen,
  size = 'normal',
}: QuickActionCardProps) {
  return (
    <TouchableOpacity style={[styles.card, size === 'large' && styles.largeCard]} onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.iconContainer, { backgroundColor: accentColor + '30' }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flex: 1,
    ...Shadow.card,
  },
  largeCard: {
    padding: Spacing.lg,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  icon: {
    fontSize: 24,
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
