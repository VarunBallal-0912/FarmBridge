import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';

export interface DiseaseResult {
  diseaseName: string;
  confidence: number; // 0–100
  symptoms: string[];
  treatment: string[];
  prevention: string[];
}

interface DiseaseResultCardProps {
  result: DiseaseResult;
}

export function DiseaseResultCard({ result }: DiseaseResultCardProps) {
  const confidenceColor = result.confidence >= 80 ? Colors.priceUp : result.confidence >= 60 ? '#E65100' : Colors.priceDown;

  return (
    <View style={styles.card}>
      {/* Demo watermark */}
      <View style={styles.demoTag}>
        <Text style={styles.demoText}>DEMO RESULT</Text>
      </View>

      {/* Disease name + confidence */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.label}>Possible Disease</Text>
          <Text style={styles.diseaseName}>{result.diseaseName}</Text>
        </View>
        <View style={[styles.confidenceBadge, { borderColor: confidenceColor }]}>
          <Text style={[styles.confidenceNumber, { color: confidenceColor }]}>{result.confidence}%</Text>
          <Text style={styles.confidenceLabel}>confidence</Text>
        </View>
      </View>

      {/* Symptoms */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🔍</Text>
          <Text style={styles.sectionTitle}>Symptoms</Text>
        </View>
        {result.symptoms.map((s, i) => (
          <Text key={i} style={styles.bulletItem}>• {s}</Text>
        ))}
      </View>

      {/* Treatment */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>💊</Text>
          <Text style={styles.sectionTitle}>Treatment</Text>
        </View>
        {result.treatment.map((t, i) => (
          <Text key={i} style={styles.bulletItem}>• {t}</Text>
        ))}
      </View>

      {/* Prevention */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>🛡️</Text>
          <Text style={styles.sectionTitle}>Prevention</Text>
        </View>
        {result.prevention.map((p, i) => (
          <Text key={i} style={styles.bulletItem}>• {p}</Text>
        ))}
      </View>

      <Text style={styles.disclaimer}>
        ⚠️ This is a demo result. Consult your local agronomist for accurate diagnosis.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    ...Shadow.card,
  },
  demoTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.pill,
    marginBottom: Spacing.sm,
  },
  demoText: {
    fontSize: Typography.xs,
    fontWeight: Typography.bold,
    color: '#E65100',
    letterSpacing: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  headerLeft: {
    flex: 1,
  },
  label: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontWeight: Typography.medium,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  diseaseName: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  confidenceBadge: {
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    minWidth: 64,
  },
  confidenceNumber: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
  },
  confidenceLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
  },
  section: {
    marginBottom: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  sectionIcon: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
  },
  bulletItem: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 21,
    marginBottom: 2,
    paddingLeft: 4,
  },
  disclaimer: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    lineHeight: 18,
  },
});
