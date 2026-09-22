import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import { FilterChip } from '@/components/ui/FilterChip';
import { MandiCard } from '@/components/ui/MandiCards';
import { EmptyState } from '@/components/ui/States';
import { CROPS } from '@/mock/crops';
import { MANDI_COMPARISONS } from '@/mock/prices';

export default function CompareScreen() {
  const params = useLocalSearchParams<{ cropId?: string; cropName?: string }>();
  const [selectedCropId, setSelectedCropId] = useState(params.cropId ?? 'onion');

  const selectedCrop = CROPS.find(c => c.id === selectedCropId);
  const comparison = MANDI_COMPARISONS[selectedCropId] ?? [];
  const sorted = [...comparison].sort((a, b) => b.price - a.price);
  const maxPrice = sorted[0]?.price ?? 0;
  const minPrice = sorted[sorted.length - 1]?.price ?? 0;
  const priceDiff = maxPrice - minPrice;

  // Only crops that have comparison data
  const availableCrops = CROPS.filter(c => MANDI_COMPARISONS[c.id]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.headerBlock}>
          <Text style={styles.title}>Compare Mandi Prices</Text>
          <Text style={styles.subtitle}>Find where your crop gets the best price today</Text>
        </View>

        {/* Step 1: Select Crop */}
        <View style={styles.step}>
          <View style={styles.stepLabel}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>1</Text></View>
            <Text style={styles.stepTitle}>Select Crop</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cropChips}
          >
            {availableCrops.map(crop => (
              <FilterChip
                key={crop.id}
                label={`${crop.icon} ${crop.name}`}
                selected={selectedCropId === crop.id}
                onPress={() => setSelectedCropId(crop.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Step 2: Comparison */}
        <View style={styles.step}>
          <View style={styles.stepLabel}>
            <View style={styles.stepNum}><Text style={styles.stepNumText}>2</Text></View>
            <Text style={styles.stepTitle}>Mandi Comparison</Text>
          </View>

          {sorted.length === 0 ? (
            <EmptyState icon="📊" title="No comparison data" subtitle="Select a different crop" />
          ) : (
            <>
              {/* Summary banner */}
              <View style={styles.summaryBanner}>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Best Price</Text>
                  <Text style={styles.summaryValueGood}>₹{maxPrice.toLocaleString('en-IN')}</Text>
                  <Text style={styles.summaryMandi}>{sorted[0]?.mandiName}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Lowest Price</Text>
                  <Text style={styles.summaryValueLow}>₹{minPrice.toLocaleString('en-IN')}</Text>
                  <Text style={styles.summaryMandi}>{sorted[sorted.length - 1]?.mandiName}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Difference</Text>
                  <Text style={styles.summaryValueDiff}>₹{priceDiff.toLocaleString('en-IN')}</Text>
                  <Text style={styles.summaryMandi}>per quintal</Text>
                </View>
              </View>

              <Text style={styles.listNote}>
                💡 Selling at {sorted[0]?.mandiName} could earn you ₹{priceDiff.toLocaleString('en-IN')}/qtl more
              </Text>

              {/* Mandi list */}
              {sorted.map((item, index) => (
                <MandiCard
                  key={item.mandiId}
                  mandi={item}
                  isBest={index === 0}
                  isLowest={index === sorted.length - 1 && priceDiff > 0}
                />
              ))}

              {/* CTA */}
              <TouchableOpacity
                style={styles.detailsBtn}
                onPress={() =>
                  router.push({
                    pathname: '/crop-details',
                    params: { cropId: selectedCropId, cropName: selectedCrop?.name },
                  })
                }
                activeOpacity={0.8}
              >
                <Text style={styles.detailsBtnText}>
                  View {selectedCrop?.name} Price Details →
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.screenBg },
  content: { padding: Spacing.base },
  headerBlock: { marginBottom: Spacing.lg },
  title: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  step: { marginBottom: Spacing.xl },
  stepLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: Spacing.md,
  },
  stepNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primarySage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumText: {
    fontSize: Typography.sm,
    color: Colors.white,
    fontWeight: Typography.bold,
  },
  stepTitle: {
    fontSize: Typography.md,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
  },
  cropChips: {
    gap: Spacing.sm,
    paddingVertical: 4,
    alignItems: 'center',
  },
  summaryBanner: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    ...Shadow.card,
    marginBottom: Spacing.md,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginBottom: 4,
    textAlign: 'center',
  },
  summaryValueGood: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.priceUp,
  },
  summaryValueLow: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.priceDown,
  },
  summaryValueDiff: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.primarySage,
  },
  summaryMandi: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 4,
  },
  listNote: {
    fontSize: Typography.sm,
    color: Colors.primarySage,
    fontWeight: Typography.medium,
    backgroundColor: Colors.lightGreen + '25',
    padding: Spacing.sm + 2,
    borderRadius: Radius.md,
    marginBottom: Spacing.md,
    lineHeight: 20,
  },
  detailsBtn: {
    marginTop: Spacing.md,
    backgroundColor: Colors.primarySage,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    ...Shadow.card,
  },
  detailsBtnText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.white,
  },
});
