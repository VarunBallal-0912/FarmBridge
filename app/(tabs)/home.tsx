import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import { SearchBar } from '@/components/ui/SearchBar';
import { PriceCard } from '@/components/ui/PriceCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { QuickActionCard } from '@/components/ui/QuickActionCard';
import { TODAY_PRICES } from '@/mock/prices';

const QUICK_SEARCHES = ['Onion 🧅', 'Tomato 🍅', 'Wheat 🌾', 'Potato 🥔'];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrices = searchQuery
    ? TODAY_PRICES.filter(p =>
        p.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.mandiName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : TODAY_PRICES;

  function handlePriceCardPress(item: typeof TODAY_PRICES[0]) {
    router.push({ pathname: '/crop-details', params: { cropId: item.cropId, cropName: item.cropName } });
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
              <Text style={styles.avatarText}>👨‍🌾</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Namaskar, Farmer 👋</Text>
              <Text style={styles.greetingSub}>Pune, Maharashtra · Today</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Text style={styles.notifIcon}>🔔</Text>
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickSearchRow}>
            {QUICK_SEARCHES.map(q => (
              <TouchableOpacity
                key={q}
                style={styles.quickChip}
                onPress={() => setSearchQuery(q.split(' ')[0])}
                activeOpacity={0.75}
              >
                <Text style={styles.quickChipText}>{q}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Today's Prices ── */}
        <View style={styles.section}>
          <SectionHeader
            title="Today's Market Prices"
            subtitle="Live mandi prices · Pune"
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
        >
          <View>
            <Text style={styles.compareCtaLabel}>Compare Mandi Prices</Text>
            <Text style={styles.compareCtaSub}>Find where your crop gets the best price</Text>
          </View>
          <View style={styles.compareArrow}>
            <Text style={styles.compareArrowText}>→</Text>
          </View>
        </TouchableOpacity>

        {/* ── Quick Actions ── */}
        <View style={styles.section}>
          <SectionHeader title="Quick Actions" />
          <View style={styles.quickActionsGrid}>
            <View style={styles.quickActionsRow}>
              <QuickActionCard
                icon="🤖"
                title="Kisan AI"
                subtitle="Ask anything about farming"
                onPress={() => router.push('/(tabs)/ai')}
                accentColor={Colors.primarySage}
              />
              <View style={styles.quickActionSpacer} />
              <QuickActionCard
                icon="🌿"
                title="Crop Disease"
                subtitle="Identify crop diseases"
                onPress={() => router.push('/disease')}
                accentColor={Colors.lightGreen}
              />
            </View>
            <View style={[styles.quickActionsRow, { marginTop: Spacing.sm }]}>
              <QuickActionCard
                icon="🏛️"
                title="Govt. Schemes"
                subtitle="Find schemes you may be eligible for"
                onPress={() => router.push('/schemes')}
                accentColor={Colors.warmBeige}
              />
              <View style={styles.quickActionSpacer} />
              <QuickActionCard
                icon="📊"
                title="Market Prices"
                subtitle="All crop prices today"
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

        {/* Bottom padding */}
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
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  greeting: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  greetingSub: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  notifBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.card,
  },
  notifIcon: {
    fontSize: 20,
  },
  searchSection: {
    marginBottom: Spacing.lg,
  },
  quickSearchRow: {
    marginTop: Spacing.sm,
    flexDirection: 'row',
  },
  quickChip: {
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base,
    height: 38,
    minHeight: 38,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
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
  compareCtaLabel: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.white,
    marginBottom: 3,
  },
  compareCtaSub: {
    fontSize: Typography.sm,
    color: 'rgba(255,255,255,0.82)',
  },
  compareArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compareArrowText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: Typography.bold,
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
