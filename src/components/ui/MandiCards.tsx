import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import type { CropMandiPrice } from '@/mock/prices';

interface PriceComparisonCardProps {
  items: CropMandiPrice[];
  cropName?: string;
}

export function PriceComparisonCard({ items, cropName }: PriceComparisonCardProps) {
  const sorted = [...items].sort((a, b) => b.price - a.price);
  const maxPrice = sorted[0]?.price ?? 0;
  const minPrice = sorted[sorted.length - 1]?.price ?? 0;

  return (
    <View style={styles.card}>
      {cropName && <Text style={styles.cropName}>{cropName}</Text>}
      {sorted.map((item, index) => {
        const isBest = item.price === maxPrice;
        const isLowest = item.price === minPrice;
        const barWidth = maxPrice > 0 ? (item.price / maxPrice) * 100 : 0;

        return (
          <View key={item.mandiId} style={styles.row}>
            <View style={styles.rowLeft}>
              <Text style={styles.mandiName}>{item.mandiName}</Text>
              {item.distanceKm !== undefined && (
                <Text style={styles.distance}>{item.distanceKm} km away</Text>
              )}
            </View>
            <View style={styles.rowRight}>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    { width: `${barWidth}%` as any },
                    isBest && styles.barBest,
                    isLowest && styles.barLowest,
                  ]}
                />
              </View>
              <Text style={[styles.price, isBest && styles.priceBest]}>
                ₹{item.price.toLocaleString('en-IN')}
              </Text>
              {isBest && <Text style={styles.bestBadge}>Best</Text>}
            </View>
          </View>
        );
      })}
    </View>
  );
}

// Simple MandiCard for comparison rows
interface MandiCardProps {
  mandi: CropMandiPrice;
  isBest?: boolean;
  isLowest?: boolean;
  onPress?: () => void;
}

export function MandiCard({ mandi, isBest, isLowest }: MandiCardProps) {
  return (
    <View style={[styles.mandiCard, isBest && styles.mandiCardBest]}>
      <View style={styles.mandiCardLeft}>
        <Text style={[styles.mandiCardName, isBest && { color: Colors.white }]}>{mandi.mandiName}</Text>
        {mandi.distanceKm !== undefined && (
          <Text style={[styles.mandiCardDist, isBest && { color: 'rgba(255,255,255,0.8)' }]}>
            {mandi.distanceKm} km away
          </Text>
        )}
      </View>
      <View style={styles.mandiCardRight}>
        <Text style={[styles.mandiCardPrice, isBest && { color: Colors.white }]}>
          ₹{mandi.price.toLocaleString('en-IN')}
        </Text>
        <Text style={[styles.mandiCardUnit, isBest && { color: 'rgba(255,255,255,0.8)' }]}>
          /{mandi.unit}
        </Text>
        {isBest && (
          <View style={styles.bestTag}>
            <Text style={styles.bestTagText}>Best Price</Text>
          </View>
        )}
        {isLowest && !isBest && (
          <View style={[styles.bestTag, { backgroundColor: Colors.priceDownBg }]}>
            <Text style={[styles.bestTagText, { color: Colors.priceDown }]}>Lowest</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    ...Shadow.card,
  },
  cropName: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  rowLeft: {
    flex: 1,
  },
  mandiName: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textPrimary,
  },
  distance: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  rowRight: {
    flex: 1.5,
    alignItems: 'flex-end',
    gap: 4,
  },
  barContainer: {
    width: '100%',
    height: 6,
    backgroundColor: Colors.borderLight,
    borderRadius: Radius.pill,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: Colors.lightGreen,
    borderRadius: Radius.pill,
  },
  barBest: {
    backgroundColor: Colors.primarySage,
  },
  barLowest: {
    backgroundColor: Colors.warmBeige,
  },
  price: {
    fontSize: Typography.base,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  priceBest: {
    color: Colors.primarySage,
  },
  bestBadge: {
    fontSize: Typography.xs,
    color: Colors.primarySage,
    fontWeight: Typography.semibold,
  },
  // MandiCard styles
  mandiCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Shadow.card,
    marginBottom: Spacing.sm,
    borderWidth: 1.5,
    borderColor: Colors.borderLight,
  },
  mandiCardBest: {
    backgroundColor: Colors.primarySage,
    borderColor: Colors.primarySage,
  },
  mandiCardLeft: {
    flex: 1,
  },
  mandiCardName: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
  },
  mandiCardDist: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  mandiCardRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  mandiCardPrice: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  mandiCardUnit: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: -4,
  },
  bestTag: {
    backgroundColor: Colors.priceUpBg,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  bestTagText: {
    fontSize: Typography.xs,
    color: Colors.priceUp,
    fontWeight: Typography.semibold,
  },
});
