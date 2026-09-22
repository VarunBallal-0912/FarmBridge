import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import type { PriceRecord } from '@/mock/prices';

interface PriceCardProps {
  item: PriceRecord;
  onPress?: () => void;
  compact?: boolean;
}

function PriceIndicator({ change }: { change: number }) {
  if (change > 0) {
    return (
      <View style={[styles.indicatorBadge, { backgroundColor: Colors.priceUpBg }]}>
        <Text style={[styles.indicatorText, { color: Colors.priceUp }]}>↑ {change.toFixed(1)}%</Text>
      </View>
    );
  }
  if (change < 0) {
    return (
      <View style={[styles.indicatorBadge, { backgroundColor: Colors.priceDownBg }]}>
        <Text style={[styles.indicatorText, { color: Colors.priceDown }]}>↓ {Math.abs(change).toFixed(1)}%</Text>
      </View>
    );
  }
  return (
    <View style={[styles.indicatorBadge, { backgroundColor: Colors.borderLight }]}>
      <Text style={[styles.indicatorText, { color: Colors.textSecondary }]}>— 0%</Text>
    </View>
  );
}

export function PriceCard({ item, onPress, compact = false }: PriceCardProps) {
  return (
    <TouchableOpacity style={[styles.card, compact && styles.compactCard]} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.leftSection}>
        <Text style={styles.cropIcon}>{item.cropIcon}</Text>
        <View style={styles.cropInfo}>
          <Text style={styles.cropName}>{item.cropName}</Text>
          <Text style={styles.mandiName}>{item.mandiName}</Text>
          {!compact && (
            <View style={styles.minMaxRow}>
              <Text style={styles.minMax}>Min ₹{item.minPrice.toLocaleString('en-IN')}</Text>
              <Text style={styles.minMaxSep}>·</Text>
              <Text style={styles.minMax}>Max ₹{item.maxPrice.toLocaleString('en-IN')}</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.price}>₹{item.currentPrice.toLocaleString('en-IN')}</Text>
        <Text style={styles.unit}>/{item.unit}</Text>
        <PriceIndicator change={item.changePercent} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBg,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadow.card,
    marginBottom: Spacing.sm,
  },
  compactCard: {
    padding: Spacing.md,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cropIcon: {
    fontSize: 32,
    marginRight: Spacing.md,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  mandiName: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  minMaxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  minMax: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  minMaxSep: {
    color: Colors.textSecondary,
    fontSize: Typography.xs,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 4,
  },
  price: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  unit: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: -4,
  },
  indicatorBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  indicatorText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
  },
});
