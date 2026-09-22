import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import { StatCard } from '@/components/ui/StatCard';
import { MandiCard } from '@/components/ui/MandiCards';
import { CropBadge } from '@/components/ui/CropBadge';
import { TODAY_PRICES, CROP_TRENDS, MANDI_COMPARISONS, formatPrice } from '@/mock/prices';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  ArrowRight,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - Spacing.base * 2 - 32;

type TrendRange = '7d' | '30d';

function PriceChart({ data }: { data: { date: string; price: number }[] }) {
  const prices = data.map(d => d.price);
  const maxP = Math.max(...prices);
  const minP = Math.min(...prices);
  const range = maxP - minP || 1;
  const barWidth = (CHART_WIDTH - (data.length - 1) * 4) / data.length;

  return (
    <View style={chart.container}>
      {/* Y-axis labels */}
      <View style={chart.yLabels}>
        <Text style={chart.yLabel}>{formatPrice(maxP)}</Text>
        <Text style={chart.yLabel}>{formatPrice(Math.round((maxP + minP) / 2))}</Text>
        <Text style={chart.yLabel}>{formatPrice(minP)}</Text>
      </View>
      {/* Bars */}
      <View style={chart.barsArea}>
        {data.map((point, i) => {
          const heightRatio = (point.price - minP) / range;
          const barHeight = Math.max(8, heightRatio * 100);
          const isLast = i === data.length - 1;
          return (
            <View key={i} style={[chart.barWrapper, { width: barWidth }]}>
              <Text style={chart.barValue}>
                {isLast ? formatPrice(point.price) : ''}
              </Text>
              <View
                style={[
                  chart.bar,
                  {
                    height: barHeight,
                    width: Math.max(barWidth - 4, 6),
                    backgroundColor: isLast ? Colors.primarySage : Colors.lightGreen,
                  },
                ]}
              />
              <Text style={chart.barDate} numberOfLines={1}>
                {point.date.split(' ')[1] || point.date}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function CropDetailsScreen() {
  const { cropId, cropName } = useLocalSearchParams<{ cropId: string; cropName: string }>();
  const [trendRange, setTrendRange] = useState<TrendRange>('7d');

  const priceRecord = TODAY_PRICES.find(p => p.cropId === cropId);
  const trends = CROP_TRENDS[cropId ?? ''];
  const comparisonData = MANDI_COMPARISONS[cropId ?? ''];

  if (!priceRecord) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <Text style={styles.notFound}>Price data not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const avgPrice = Math.round((priceRecord.minPrice + priceRecord.maxPrice) / 2);
  const trendData = trends?.[trendRange];
  const sortedComparison = comparisonData
    ? [...comparisonData].sort((a, b) => b.price - a.price)
    : [];
  const maxMandi = sortedComparison[0];
  const minMandi = sortedComparison[sortedComparison.length - 1];

  const changeIsUp = priceRecord.changePercent > 0;
  const changeIsDown = priceRecord.changePercent < 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hero price section */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <CropBadge cropId={priceRecord.cropId} size="large" />
            <View style={styles.heroInfo}>
              <Text style={styles.heroName}>{priceRecord.cropName}</Text>
              <Text style={styles.heroMandi}>{priceRecord.mandiName}</Text>
            </View>
            <View
              style={[
                styles.changeBadge,
                {
                  backgroundColor: changeIsUp
                    ? Colors.priceUpBg
                    : changeIsDown
                    ? Colors.priceDownBg
                    : Colors.borderLight,
                },
              ]}
            >
              {changeIsUp && <TrendingUp size={14} color={Colors.priceUp} strokeWidth={2.5} />}
              {changeIsDown && <TrendingDown size={14} color={Colors.priceDown} strokeWidth={2.5} />}
              {!changeIsUp && !changeIsDown && <Minus size={14} color={Colors.textSecondary} strokeWidth={2.5} />}
              <Text
                style={[
                  styles.changeBadgeText,
                  {
                    color: changeIsUp
                      ? Colors.priceUp
                      : changeIsDown
                      ? Colors.priceDown
                      : Colors.textSecondary,
                  },
                ]}
              >
                {Math.abs(priceRecord.changePercent).toFixed(1)}%
              </Text>
            </View>
          </View>
          <Text style={styles.heroPriceLabel}>Current Price</Text>
          <Text style={styles.heroPrice}>
            ₹{priceRecord.currentPrice.toLocaleString('en-IN')}
            <Text style={styles.heroPriceUnit}> / quintal</Text>
          </Text>
        </View>

        {/* Stat cards */}
        <View style={styles.statsRow}>
          <StatCard label="Min Price" value={formatPrice(priceRecord.minPrice)} icon={TrendingDown} />
          <View style={{ width: Spacing.sm }} />
          <StatCard label="Today's Price" value={formatPrice(priceRecord.currentPrice)} icon={BarChart3} highlight />
          <View style={{ width: Spacing.sm }} />
          <StatCard label="Max Price" value={formatPrice(priceRecord.maxPrice)} icon={TrendingUp} />
        </View>
        <View style={[styles.statsRow, { marginTop: Spacing.sm }]}>
          <StatCard label="Average" value={formatPrice(avgPrice)} />
          <View style={{ width: Spacing.sm }} />
          <StatCard label="Unit" value={`Per ${priceRecord.unit}`} />
          <View style={{ width: Spacing.sm }} />
          <StatCard label="Date" value="22 Sep 2026" />
        </View>

        {/* Price trend */}
        {trendData && (
          <View style={styles.section}>
            <View style={styles.trendHeader}>
              <Text style={styles.sectionTitle}>Price Trend</Text>
              <View style={styles.trendToggle}>
                {(['7d', '30d'] as TrendRange[]).map(r => (
                  <TouchableOpacity
                    key={r}
                    style={[styles.toggleBtn, trendRange === r && styles.toggleBtnActive]}
                    onPress={() => setTrendRange(r)}
                  >
                    <Text style={[styles.toggleText, trendRange === r && styles.toggleTextActive]}>
                      {r === '7d' ? '7 Days' : '30 Days'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.chartCard}>
              <PriceChart data={trendData} />
            </View>
          </View>
        )}

        {/* Mandi comparison */}
        {sortedComparison.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Compare with Other Mandis</Text>
            <Text style={styles.sectionSubtitle}>
              Best price: {maxMandi?.mandiName} at {formatPrice(maxMandi?.price ?? 0)}/qtl
            </Text>
            {sortedComparison.map(item => (
              <MandiCard
                key={item.mandiId}
                mandi={item}
                isBest={item.price === maxMandi?.price}
                isLowest={item.price === minMandi?.price && item.price !== maxMandi?.price}
              />
            ))}
            <TouchableOpacity
              style={styles.compareAllBtn}
              onPress={() =>
                router.push({ pathname: '/compare', params: { cropId, cropName } })
              }
              activeOpacity={0.8}
            >
              <Text style={styles.compareAllText}>Full Mandi Comparison</Text>
              <ArrowRight size={16} color={Colors.primarySage} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const chart = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 140,
    alignItems: 'flex-end',
  },
  yLabels: {
    width: 64,
    height: 110,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 6,
    paddingBottom: 18,
  },
  yLabel: {
    fontSize: 9,
    color: Colors.textSecondary,
  },
  barsArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  barWrapper: {
    alignItems: 'center',
    gap: 4,
  },
  barValue: {
    fontSize: 7,
    color: Colors.primarySage,
    fontWeight: '600',
    textAlign: 'center',
  },
  bar: {
    borderRadius: 4,
  },
  barDate: {
    fontSize: 8,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.screenBg },
  content: { padding: Spacing.base },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFound: { fontSize: Typography.base, color: Colors.textSecondary },
  heroCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.card,
    marginBottom: Spacing.md,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: 12,
  },
  heroInfo: { flex: 1 },
  heroName: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  heroMandi: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.pill,
  },
  changeBadgeText: {
    fontSize: Typography.sm,
    fontWeight: Typography.bold,
  },
  heroPriceLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  heroPrice: {
    fontSize: 38,
    fontWeight: Typography.extrabold,
    color: Colors.textPrimary,
  },
  heroPriceUnit: {
    fontSize: Typography.base,
    fontWeight: Typography.regular,
    color: Colors.textSecondary,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  section: {
    marginTop: Spacing.xl,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: Typography.sm,
    color: Colors.primarySage,
    fontWeight: Typography.medium,
    marginBottom: Spacing.md,
  },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  trendToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.borderLight,
    borderRadius: Radius.pill,
    padding: 2,
  },
  toggleBtn: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: Radius.pill,
  },
  toggleBtnActive: {
    backgroundColor: Colors.primarySage,
  },
  toggleText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.medium,
  },
  toggleTextActive: {
    color: Colors.white,
    fontWeight: Typography.semibold,
  },
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.card,
  },
  compareAllBtn: {
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.primarySage,
    ...Shadow.card,
  },
  compareAllText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.primarySage,
  },
});
