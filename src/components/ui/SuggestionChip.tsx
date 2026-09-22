import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';
import type { LucideIcon } from 'lucide-react-native';

interface SuggestionChipProps {
  label: string;
  onPress?: () => void;
  icon?: LucideIcon;
}

export function SuggestionChip({ label, onPress, icon: IconComponent }: SuggestionChipProps) {
  return (
    <TouchableOpacity
      style={styles.chip}
      onPress={onPress}
      activeOpacity={0.75}
      accessibilityRole="button"
    >
      {IconComponent && (
        <IconComponent size={14} color={Colors.primarySage} strokeWidth={2} style={styles.icon} />
      )}
      <Text style={styles.label} numberOfLines={1}>
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
    borderColor: Colors.lightGreen,
    gap: 6,
  },
  icon: {
    marginRight: 2,
  },
  label: {
    fontSize: Typography.sm,
    color: Colors.primarySage,
    fontWeight: Typography.medium,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
