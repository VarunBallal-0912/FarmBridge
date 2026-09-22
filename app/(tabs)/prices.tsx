import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { SearchBar } from '@/components/ui/SearchBar';
import { PriceCard } from '@/components/ui/PriceCard';
import { CategoryTabs } from '@/components/ui/CategoryTabs';
import { EmptyState } from '@/components/ui/States';
import { TODAY_PRICES } from '@/mock/prices';
import {
  LayoutGrid,
  Sprout,
  Wheat,
  Flame,
  Droplets,
  Apple,
  Search,
} from 'lucide-react-native';

const CATEGORIES = [
  { id: 'all', label: 'All Crops', icon: LayoutGrid },
  { id: 'vegetable', label: 'Vegetables', icon: Sprout },
  { id: 'grain', label: 'Grains', icon: Wheat },
  { id: 'spice', label: 'Spices', icon: Flame },
  { id: 'oilseed', label: 'Oilseeds', icon: Droplets },
  { id: 'fruit', label: 'Fruits', icon: Apple },
];

const CROP_CATEGORIES: Record<string, string> = {
  onion: 'vegetable',
  tomato: 'vegetable',
  potato: 'vegetable',
  wheat: 'grain',
  rice: 'grain',
  maize: 'grain',
  sugarcane: 'grain',
  chilli: 'spice',
  garlic: 'spice',
  soybean: 'oilseed',
  cotton: 'oilseed',
  banana: 'fruit',
};

export default function PricesScreen() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(() => {
    return TODAY_PRICES.filter(p => {
      const matchSearch =
        !search ||
        p.cropName.toLowerCase().includes(search.toLowerCase()) ||
        p.mandiName.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        activeFilter === 'all' || CROP_CATEGORIES[p.cropId] === activeFilter;
      return matchSearch && matchFilter;
    });
  }, [search, activeFilter]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Market Prices</Text>
        <Text style={styles.subtitle}>Today's mandi prices · 22 Sep 2026</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search crop or mandi..."
        />
      </View>

      {/* Category Tabs */}
      <CategoryTabs
        items={CATEGORIES}
        selectedId={activeFilter}
        onSelect={setActiveFilter}
        style={styles.categoryTabs}
      />

      {/* Price List */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            icon={Search}
            title="No crops found"
            subtitle="Try adjusting your search or category filter"
            actionLabel={search || activeFilter !== 'all' ? 'Reset Filters' : undefined}
            onAction={() => {
              setSearch('');
              setActiveFilter('all');
            }}
          />
        }
        renderItem={({ item }) => (
          <PriceCard
            item={item}
            onPress={() =>
              router.push({
                pathname: '/crop-details',
                params: { cropId: item.cropId, cropName: item.cropName },
              })
            }
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
  header: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.sm,
  },
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
  searchContainer: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
  },
  categoryTabs: {
    marginBottom: Spacing.sm,
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
  },
});
