import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: string;
}

export function FilterChip({ label, selected = false, onPress, icon }: FilterChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text
        style={[styles.label, selected && styles.labelSelected]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
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
    gap: 6,
  },
  chipSelected: {
    backgroundColor: Colors.primarySage,
    borderColor: Colors.primarySage,
  },
  icon: {
    fontSize: 16,
    includeFontPadding: false,
  },
  label: {
    fontSize: Typography.sm,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  labelSelected: {
    color: Colors.white,
    fontWeight: Typography.semibold,
  },
});
