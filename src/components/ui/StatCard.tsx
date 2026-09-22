import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import type { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
  label: string;
  value: string;
  icon?: LucideIcon | string;
  highlight?: boolean;
}

export function StatCard({ label, value, icon, highlight = false }: StatCardProps) {
  const isLucideIcon = typeof icon !== 'string' && icon !== undefined;
  const IconComponent = isLucideIcon ? icon : null;

  return (
    <View style={[styles.card, highlight && styles.highlightCard]}>
      {IconComponent ? (
        <View style={styles.iconContainer}>
          <IconComponent
            size={18}
            color={highlight ? Colors.white : Colors.primarySage}
            strokeWidth={2}
          />
        </View>
      ) : icon ? (
        <Text style={styles.icon}>{icon as string}</Text>
      ) : null}
      <Text style={[styles.value, highlight && styles.highlightValue]}>{value}</Text>
      <Text style={[styles.label, highlight && styles.highlightLabel]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.card,
  },
  highlightCard: {
    backgroundColor: Colors.primarySage,
    borderColor: Colors.primarySage,
  },
  iconContainer: {
    marginBottom: 6,
  },
  icon: {
    fontSize: 18,
    marginBottom: 4,
  },
  value: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
    letterSpacing: -0.2,
  },
  highlightValue: {
    color: Colors.white,
  },
  label: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: Typography.medium,
  },
  highlightLabel: {
    color: 'rgba(255,255,255,0.88)',
  },
});
