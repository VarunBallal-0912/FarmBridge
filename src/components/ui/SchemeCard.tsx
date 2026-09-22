import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import type { Scheme } from '@/mock/schemes';

interface SchemeCardProps {
  scheme: Scheme;
  onPress?: () => void;
}

export function SchemeCard({ scheme, onPress }: SchemeCardProps) {
  const [expanded, setExpanded] = useState(false);

  const categoryColors: Record<string, string> = {
    financial: '#E8F5E9',
    insurance: '#E3F2FD',
    equipment: '#FFF3E0',
    irrigation: '#E0F7FA',
    support: '#F3E5F5',
  };
  const categoryTextColors: Record<string, string> = {
    financial: '#2E7D32',
    insurance: '#1565C0',
    equipment: '#E65100',
    irrigation: '#00695C',
    support: '#6A1B9A',
  };

  const bgColor = categoryColors[scheme.category] ?? Colors.borderLight;
  const textColor = categoryTextColors[scheme.category] ?? Colors.textSecondary;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View style={[styles.categoryBadge, { backgroundColor: bgColor }]}>
          <Text style={[styles.categoryText, { color: textColor }]}>{scheme.categoryLabel}</Text>
        </View>
        {scheme.isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>Popular</Text>
          </View>
        )}
      </View>

      <Text style={styles.name}>{scheme.name}</Text>
      <Text style={styles.description}>{scheme.shortDescription}</Text>

      {/* Benefits preview */}
      <View style={styles.benefitsRow}>
        {scheme.benefits.slice(0, 2).map((b, i) => (
          <View key={i} style={styles.benefitChip}>
            <Text style={styles.benefitText}>✓ {b}</Text>
          </View>
        ))}
      </View>

      {/* Expanded section */}
      {expanded && (
        <View style={styles.expandedSection}>
          <Text style={styles.sectionLabel}>Eligibility</Text>
          {scheme.eligibility.map((e, i) => (
            <Text key={i} style={styles.bulletItem}>• {e}</Text>
          ))}
          <Text style={[styles.sectionLabel, { marginTop: Spacing.sm }]}>All Benefits</Text>
          {scheme.benefits.map((b, i) => (
            <Text key={i} style={styles.bulletItem}>✓ {b}</Text>
          ))}
          <Text style={styles.ministry}>{scheme.ministry}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.viewBtn} onPress={() => setExpanded(!expanded)} activeOpacity={0.75}>
        <Text style={styles.viewBtnText}>{expanded ? 'Show Less ↑' : 'View Details →'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: Spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  categoryText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
  },
  popularBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  popularText: {
    fontSize: Typography.xs,
    fontWeight: Typography.semibold,
    color: '#F57F17',
  },
  name: {
    fontSize: Typography.md,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  description: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  benefitsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  benefitChip: {
    backgroundColor: Colors.cream,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
  },
  benefitText: {
    fontSize: Typography.xs,
    color: Colors.primarySage,
    fontWeight: Typography.medium,
  },
  expandedSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    paddingTop: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  sectionLabel: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  bulletItem: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 2,
  },
  ministry: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 8,
    fontStyle: 'italic',
  },
  viewBtn: {
    alignSelf: 'flex-start',
  },
  viewBtnText: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
    color: Colors.primarySage,
  },
});
