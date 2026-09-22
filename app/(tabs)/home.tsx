import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import { SearchBar } from '@/components/ui/SearchBar';
import { PriceCard } from '@/components/ui/PriceCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { QuickActionCard } from '@/components/ui/QuickActionCard';
import { TODAY_PRICES } from '@/mock/prices';
import {
  User,
  Bell,
  MapPin,
  TrendingUp,
  ArrowRight,
  Bot,
  ShieldAlert,
  Landmark,
  BarChart3,
} from 'lucide-react-native';

const QUICK_SEARCHES = ['Onion', 'Tomato', 'Wheat', 'Potato'];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrices = searchQuery
    ? TODAY_PRICES.filter(
        p =>
          p.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.mandiName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : TODAY_PRICES;

  function handlePriceCardPress(item: typeof TODAY_PRICES[0]) {
    router.push({
      pathname: '/crop-details',
      params: { cropId: item.cropId, cropName: item.cropName },
    });
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Top Bar ── */}
        <View style={styles.topBar}>
          <View style={styles.greetingSection}>
            <View style={styles.avatarCircle}>
              <User size={22} color={Colors.primarySage} strokeWidth={2} />
            </View>
            <View>
              <Text style={styles.greeting}>Namaskar, Farmer</Text>
              <View style={styles.locationRow}>
                <MapPin size={12} color={Colors.textSecondary} strokeWidth={2} />
                <Text style={styles.greetingSub}>Pune, Maharashtra · Today</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.notifBtn}
            accessibilityLabel="Notifications"
            activeOpacity={0.75}
          >
            <Bell size={20} color={Colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* ── Search ── */}
        <View style={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search crop or mandi..."
          />
          {/* Quick search chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.quickSearchRow}
            contentContainerStyle={{ gap: Spacing.sm }}
          >
            {QUICK_SEARCHES.map(q => (
              <TouchableOpacity
                key={q}
                style={styles.quickChip}
                onPress={() => setSearchQuery(q)}
                activeOpacity={0.75}
              >
                <TrendingUp size={12} color={Colors.primarySage} strokeWidth={2} />
                <Text style={styles.quickChipText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Today's Prices ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Today's Market Prices"
            subtitle="Live mandi prices · Pune APMC"
            actionLabel="See All"
            onAction={() => router.push('/(tabs)/prices')}
          />
          {filteredPrices.slice(0, 4).map(item => (
            <PriceCard
              key={item.id}
              item={item}
              onPress={() => handlePriceCardPress(item)}
            />
          ))}
        </View>

        {/* ── Compare Mandi Prices CTA ── */}
        <TouchableOpacity
          style={styles.compareCta}
          onPress={() => router.push('/compare')}
          activeOpacity={0.85}
          accessibilityRole="button"
        >
          <View style={styles.compareCtaLeft}>
            <Text style={styles.compareCtaLabel}>Compare Mandi Prices</Text>
            <Text style={styles.compareCtaSub}>Find where your crop gets the best price</Text>
          </View>
          <View style={styles.compareArrow}>
            <ArrowRight size={20} color={Colors.white} strokeWidth={2.5} />
          </View>
        </TouchableOpacity>

        {/* ── Quick Actions ── */}
        <View style={styles.section}>
          <SectionHeader title="Quick Actions" />
          <View style={styles.quickActionsGrid}>
            <View style={styles.quickActionsRow}>
              <QuickActionCard
                icon={Bot}
                title="Kisan AI"
                subtitle="Ask anything about farming & crops"
                onPress={() => router.push('/(tabs)/ai')}
                accentColor={Colors.primarySage}
              />
              <View style={styles.quickActionSpacer} />
              <QuickActionCard
                icon={ShieldAlert}
                title="Crop Disease"
                subtitle="Scan & identify plant diseases"
                onPress={() => router.push('/disease')}
                accentColor={Colors.priceUp}
              />
            </View>
            <View style={[styles.quickActionsRow, { marginTop: Spacing.sm }]}>
              <QuickActionCard
                icon={Landmark}
                title="Govt. Schemes"
                subtitle="Explore eligible farmer subsidies"
                onPress={() => router.push('/schemes')}
                accentColor="#B27A38"
              />
              <View style={styles.quickActionSpacer} />
              <QuickActionCard
                icon={BarChart3}
                title="Market Prices"
                subtitle="All daily crop rates and mandis"
                onPress={() => router.push('/(tabs)/prices')}
                accentColor={Colors.primarySage}
              />
            </View>
          </View>
        </View>

        {/* ── More Prices ── */}
        <View style={styles.section}>
          <SectionHeader
            title="More Prices"
            actionLabel="View All"
            onAction={() => router.push('/(tabs)/prices')}
          />
          {filteredPrices.slice(4).map(item => (
            <PriceCard
              key={item.id}
              item={item}
              compact
              onPress={() => handlePriceCardPress(item)}
            />
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  greetingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  greeting: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  greetingSub: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  notifBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.card,
  },
  searchSection: {
    marginBottom: Spacing.lg,
  },
  quickSearchRow: {
    marginTop: Spacing.sm,
    flexDirection: 'row',
  },
  quickChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingHorizontal: 14,
    height: 36,
    minHeight: 36,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  quickChipText: {
    fontSize: Typography.sm,
    color: Colors.textPrimary,
    fontWeight: Typography.medium,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  section: {
    marginBottom: Spacing.xl,
  },
  compareCta: {
    backgroundColor: Colors.primarySage,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
    ...Shadow.card,
  },
  compareCtaLeft: {
    flex: 1,
  },
  compareCtaLabel: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.white,
    marginBottom: 3,
  },
  compareCtaSub: {
    fontSize: Typography.sm,
    color: 'rgba(255,255,255,0.85)',
  },
  compareArrow: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionsGrid: {
    gap: 0,
  },
  quickActionsRow: {
    flexDirection: 'row',
  },
  quickActionSpacer: {
    width: Spacing.sm,
  },
});
