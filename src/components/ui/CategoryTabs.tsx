import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import type { LucideIcon } from 'lucide-react-native';

export interface CategoryItem {
  id: string;
  label: string;
  icon?: LucideIcon;
}

interface CategoryTabsProps {
  items: CategoryItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export function CategoryTabs({
  items,
  selectedId,
  onSelect,
  style,
  contentContainerStyle,
}: CategoryTabsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.scroll, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
    >
      {items.map(item => {
        const isSelected = item.id === selectedId;
        const IconComponent = item.icon;

        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.tab, isSelected && styles.tabSelected]}
            onPress={() => onSelect(item.id)}
            activeOpacity={0.75}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected }}
          >
            {IconComponent && (
              <IconComponent
                size={16}
                color={isSelected ? Colors.white : Colors.textSecondary}
                strokeWidth={2}
              />
            )}
            <Text
              style={[styles.label, isSelected && styles.labelSelected]}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
    marginBottom: Spacing.md,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingVertical: 2,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.base,
    height: 42,
    minHeight: 42,
    borderWidth: 1.5,
    borderColor: Colors.border,
    gap: 7,
  },
  tabSelected: {
    backgroundColor: Colors.primarySage,
    borderColor: Colors.primarySage,
  },
  label: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textPrimary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  labelSelected: {
    color: Colors.white,
    fontWeight: Typography.semibold,
  },
});
