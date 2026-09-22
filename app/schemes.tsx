import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterChip } from '@/components/ui/FilterChip';
import { SchemeCard } from '@/components/ui/SchemeCard';
import { EmptyState } from '@/components/ui/States';
import { SCHEMES, SCHEME_CATEGORIES, getSchemesByCategory, type SchemeCategory } from '@/mock/schemes';

export default function SchemesScreen() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<SchemeCategory | 'all'>('all');

  const filtered = useMemo(() => {
    const byCategory = getSchemesByCategory(activeCategory);
    if (!search) return byCategory;
    return byCategory.filter(
      s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        s.categoryLabel.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, activeCategory]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Government Schemes</Text>
        <Text style={styles.subtitle}>Schemes available for Indian farmers</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search schemes..."
        />
      </View>

      {/* Category filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContent}
      >
        {SCHEME_CATEGORIES.map(cat => (
          <FilterChip
            key={cat.id}
            label={`${cat.icon} ${cat.label}`}
            selected={activeCategory === cat.id}
            onPress={() => setActiveCategory(cat.id as SchemeCategory | 'all')}
          />
        ))}
      </ScrollView>

      {/* Scheme list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.resultCount}>
            {filtered.length} scheme{filtered.length !== 1 ? 's' : ''} found
          </Text>
        }
        ListEmptyComponent={
          <EmptyState
            icon="🔍"
            title="No schemes found"
            subtitle="Try a different search or category"
          />
        }
        renderItem={({ item }) => <SchemeCard scheme={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.screenBg },
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
  filtersScroll: {
    flexGrow: 0,
    marginBottom: Spacing.md,
  },
  filtersContent: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 4,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
  },
  resultCount: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
});
