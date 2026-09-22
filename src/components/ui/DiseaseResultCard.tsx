import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import { Search, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react-native';

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
  const confidenceColor =
    result.confidence >= 80
      ? Colors.priceUp
      : result.confidence >= 60
      ? '#E65100'
      : Colors.priceDown;

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
          <Text style={[styles.confidenceNumber, { color: confidenceColor }]}>
            {result.confidence}%
          </Text>
          <Text style={styles.confidenceLabel}>confidence</Text>
        </View>
      </View>

      {/* Symptoms */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Search size={16} color={Colors.primarySage} strokeWidth={2} />
          <Text style={styles.sectionTitle}>Symptoms</Text>
        </View>
        {result.symptoms.map((s, i) => (
          <Text key={i} style={styles.bulletItem}>• {s}</Text>
        ))}
      </View>

      {/* Treatment */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Sparkles size={16} color={Colors.primarySage} strokeWidth={2} />
          <Text style={styles.sectionTitle}>Treatment</Text>
        </View>
        {result.treatment.map((t, i) => (
          <Text key={i} style={styles.bulletItem}>• {t}</Text>
        ))}
      </View>

      {/* Prevention */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <ShieldCheck size={16} color={Colors.primarySage} strokeWidth={2} />
          <Text style={styles.sectionTitle}>Prevention</Text>
        </View>
        {result.prevention.map((p, i) => (
          <Text key={i} style={styles.bulletItem}>• {p}</Text>
        ))}
      </View>

      <View style={styles.disclaimerRow}>
        <AlertCircle size={14} color={Colors.textSecondary} strokeWidth={2} style={{ marginTop: 2 }} />
        <Text style={styles.disclaimer}>
          This is an AI demo result. Consult your local agronomist or Krishi Vigyan Kendra for certified diagnosis.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.borderLight,
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
    gap: 8,
    marginBottom: 6,
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
  disclaimerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
  disclaimer: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 18,
    flex: 1,
  },
});
