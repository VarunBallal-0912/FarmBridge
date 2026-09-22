import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '@/constants/theme';

interface SuggestionChipProps {
  label: string;
  onPress?: () => void;
}

export function SuggestionChip({ label, onPress }: SuggestionChipProps) {
  return (
    <TouchableOpacity style={styles.chip} onPress={onPress} activeOpacity={0.75}>
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
  },
  label: {
    fontSize: Typography.sm,
    color: Colors.primarySage,
    fontWeight: Typography.medium,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
