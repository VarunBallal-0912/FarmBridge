import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import { CropBadge } from '@/components/ui/CropBadge';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react-native';
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
        <TrendingUp size={12} color={Colors.priceUp} strokeWidth={2.5} />
        <Text style={[styles.indicatorText, { color: Colors.priceUp }]}>
          {change.toFixed(1)}%
        </Text>
      </View>
    );
  }
  if (change < 0) {
    return (
      <View style={[styles.indicatorBadge, { backgroundColor: Colors.priceDownBg }]}>
        <TrendingDown size={12} color={Colors.priceDown} strokeWidth={2.5} />
        <Text style={[styles.indicatorText, { color: Colors.priceDown }]}>
          {Math.abs(change).toFixed(1)}%
        </Text>
      </View>
    );
  }
  return (
    <View style={[styles.indicatorBadge, { backgroundColor: Colors.surfaceMuted }]}>
      <Minus size={12} color={Colors.textSecondary} strokeWidth={2.5} />
      <Text style={[styles.indicatorText, { color: Colors.textSecondary }]}>0.0%</Text>
    </View>
  );
}

export function PriceCard({ item, onPress, compact = false }: PriceCardProps) {
  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.compactCard]}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
    >
      <View style={styles.leftSection}>
        <CropBadge cropId={item.cropId} size={compact ? 'small' : 'normal'} />
        <View style={styles.cropInfo}>
          <Text style={styles.cropName} numberOfLines={1}>
            {item.cropName}
          </Text>
          <Text style={styles.mandiName} numberOfLines={1}>
            {item.mandiName}
          </Text>
          {!compact && (
            <View style={styles.minMaxRow}>
              <Text style={styles.minMax}>
                ₹{item.minPrice.toLocaleString('en-IN')} – ₹{item.maxPrice.toLocaleString('en-IN')}
              </Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.price}>
          ₹{item.currentPrice.toLocaleString('en-IN')}
        </Text>
        <Text style={styles.unit}>/{item.unit}</Text>
        <PriceIndicator change={item.changePercent} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.borderLight,
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
    gap: Spacing.md,
  },
  cropInfo: {
    flex: 1,
  },
  cropName: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  mandiName: {
    fontSize: Typography.secondary.fontSize,
    color: Colors.textSecondary,
    marginBottom: 3,
  },
  minMaxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  minMax: {
    fontSize: Typography.xs,
    color: Colors.textMuted,
    fontWeight: Typography.medium,
  },
  rightSection: {
    alignItems: 'flex-end',
    gap: 3,
    paddingLeft: Spacing.sm,
  },
  price: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    letterSpacing: -0.2,
  },
  unit: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: -2,
    marginBottom: 2,
  },
  indicatorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  indicatorText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    includeFontPadding: false,
  },
});
