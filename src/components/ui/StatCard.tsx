import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';

interface StatCardProps {
  label: string;
  value: string;
  icon?: string;
  highlight?: boolean;
}

export function StatCard({ label, value, icon, highlight = false }: StatCardProps) {
  return (
    <View style={[styles.card, highlight && styles.highlightCard]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
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
    ...Shadow.card,
  },
  highlightCard: {
    backgroundColor: Colors.primarySage,
  },
  icon: {
    fontSize: 20,
    marginBottom: 4,
  },
  value: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  highlightValue: {
    color: Colors.white,
  },
  label: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  highlightLabel: {
    color: 'rgba(255,255,255,0.85)',
  },
});
