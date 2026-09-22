import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors, Typography, Spacing } from '@/constants/theme';
import { SearchBar } from '@/components/ui/SearchBar';
import { CategoryTabs } from '@/components/ui/CategoryTabs';
import { SchemeCard } from '@/components/ui/SchemeCard';
import { EmptyState } from '@/components/ui/States';
import { SCHEMES, getSchemesByCategory, type SchemeCategory } from '@/mock/schemes';
import {
  LayoutGrid,
  Banknote,
  ShieldCheck,
  Wrench,
  Droplets,
  Users,
  Search,
} from 'lucide-react-native';

const SCHEME_TABS = [
  { id: 'all', label: 'All Schemes', icon: LayoutGrid },
  { id: 'financial', label: 'Financial', icon: Banknote },
  { id: 'insurance', label: 'Insurance', icon: ShieldCheck },
  { id: 'equipment', label: 'Equipment', icon: Wrench },
  { id: 'irrigation', label: 'Irrigation', icon: Droplets },
  { id: 'support', label: 'Support', icon: Users },
];

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
        <Text style={styles.subtitle}>Subsidies, grants and support for Indian farmers</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search schemes, benefits, ministry..."
        />
      </View>

      {/* Category tabs */}
      <CategoryTabs
        items={SCHEME_TABS}
        selectedId={activeCategory}
        onSelect={(id) => setActiveCategory(id as SchemeCategory | 'all')}
        style={styles.categoryTabs}
      />

      {/* Scheme list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.resultCount}>
            {filtered.length} scheme{filtered.length !== 1 ? 's' : ''} available
          </Text>
        }
        ListEmptyComponent={
          <EmptyState
            icon={Search}
            title="No schemes found"
            subtitle="Try a different search term or category"
            actionLabel={search || activeCategory !== 'all' ? 'Reset Filters' : undefined}
            onAction={() => {
              setSearch('');
              setActiveCategory('all');
            }}
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
  categoryTabs: {
    marginBottom: Spacing.sm,
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
