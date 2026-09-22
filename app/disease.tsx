import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';
import { DiseaseResultCard, DiseaseResult } from '@/components/ui/DiseaseResultCard';

const MOCK_RESULT: DiseaseResult = {
  diseaseName: 'Leaf Blight',
  confidence: 92,
  symptoms: [
    'Brown or yellow spots on leaves',
    'Spots enlarge and merge causing leaf death',
    'Lesions appear water-soaked initially',
    'Lower leaves affected first, spreading upwards',
  ],
  treatment: [
    'Spray Mancozeb 75 WP @ 2 g/litre of water',
    'Apply Copper Oxychloride (50 WP) @ 3 g/litre',
    'Remove and destroy infected plant parts',
    'Avoid overhead irrigation to reduce leaf wetness',
  ],
  prevention: [
    'Use certified disease-free seeds',
    'Maintain proper plant spacing for airflow',
    'Rotate crops — avoid planting same family repeatedly',
    'Apply preventive fungicide spray at first signs of rain',
    'Monitor crop weekly during humid conditions',
  ],
};

const MOCK_RESULT_2: DiseaseResult = {
  diseaseName: 'Powdery Mildew',
  confidence: 78,
  symptoms: [
    'White powdery coating on leaves and stems',
    'Leaves curl inward and turn yellow',
    'Affected parts dry out and wither',
  ],
  treatment: [
    'Spray Sulphur 80 WP @ 2 g/litre of water',
    'Apply Tebuconazole 25 EC @ 1 ml/litre',
    'Remove severely infected plant material',
  ],
  prevention: [
    'Maintain adequate plant spacing',
    'Avoid excess nitrogen fertilizer',
    'Use resistant crop varieties where available',
  ],
};

export default function DiseaseScreen() {
  const [hasImage, setHasImage] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);

  function simulateImageSelection() {
    setHasImage(true);
    setResult(null);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult(MOCK_RESULT);
    }, 2000);
  }

  function simulateAnotherImage() {
    setHasImage(true);
    setResult(null);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult(MOCK_RESULT_2);
    }, 2000);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerBlock}>
          <Text style={styles.subtitle}>Upload a crop image to identify possible diseases.</Text>
        </View>

        {/* Upload Area */}
        <View style={[styles.uploadArea, hasImage && styles.uploadAreaFilled]}>
          {!hasImage ? (
            <>
              <Text style={styles.uploadEmoji}>📷</Text>
              <Text style={styles.uploadTitle}>Upload Crop Image</Text>
              <Text style={styles.uploadHint}>Take a clear photo of affected leaves or plant</Text>
            </>
          ) : isAnalyzing ? (
            <>
              <Text style={styles.uploadEmoji}>🔍</Text>
              <Text style={styles.uploadTitle}>Analysing image...</Text>
              <Text style={styles.uploadHint}>AI is detecting possible diseases</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </>
          ) : (
            <>
              <Text style={styles.uploadEmoji}>✅</Text>
              <Text style={styles.uploadTitle}>Analysis Complete</Text>
              <Text style={styles.uploadHint}>See results below</Text>
            </>
          )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.photoBtn, styles.btnPrimary]}
            onPress={simulateImageSelection}
            activeOpacity={0.8}
          >
            <Text style={styles.photoBtnIcon}>📷</Text>
            <Text style={styles.photoBtnText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.photoBtn, styles.btnSecondary]}
            onPress={simulateAnotherImage}
            activeOpacity={0.8}
          >
            <Text style={styles.photoBtnIcon}>🖼️</Text>
            <Text style={[styles.photoBtnText, { color: Colors.primarySage }]}>Upload Image</Text>
          </TouchableOpacity>
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>📌 Tips for best results</Text>
          <Text style={styles.tipItem}>• Take photo in good daylight</Text>
          <Text style={styles.tipItem}>• Focus on the affected leaf / stem</Text>
          <Text style={styles.tipItem}>• Keep the image clear and in focus</Text>
          <Text style={styles.tipItem}>• Include both healthy and sick parts if possible</Text>
        </View>

        {/* Result */}
        {result && (
          <View style={styles.resultSection}>
            <Text style={styles.resultSectionTitle}>Detection Result</Text>
            <DiseaseResultCard result={result} />
            <TouchableOpacity style={styles.kisanAiBtn} activeOpacity={0.8}>
              <Text style={styles.kisanAiBtnText}>🤖 Ask Kisan AI for more advice →</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.screenBg },
  content: { padding: Spacing.base },
  headerBlock: { marginBottom: Spacing.lg },
  subtitle: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  uploadArea: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    borderWidth: 2,
    borderColor: Colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xxl,
    marginBottom: Spacing.base,
    minHeight: 180,
    ...Shadow.card,
  },
  uploadAreaFilled: {
    borderColor: Colors.lightGreen,
    backgroundColor: Colors.lightGreen + '10',
  },
  uploadEmoji: { fontSize: 52, marginBottom: Spacing.md },
  uploadTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  uploadHint: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  progressBar: {
    width: '70%',
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: Radius.pill,
    marginTop: Spacing.md,
    overflow: 'hidden',
  },
  progressFill: {
    width: '65%',
    height: '100%',
    backgroundColor: Colors.primarySage,
    borderRadius: Radius.pill,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  photoBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    gap: 8,
  },
  btnPrimary: {
    backgroundColor: Colors.primarySage,
    ...Shadow.card,
  },
  btnSecondary: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.primarySage,
  },
  photoBtnIcon: { fontSize: 20 },
  photoBtnText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.white,
  },
  tipsCard: {
    backgroundColor: Colors.warmBeige + '60',
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.lg,
  },
  tipsTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  tipItem: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  resultSection: { marginTop: Spacing.sm },
  resultSectionTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  kisanAiBtn: {
    marginTop: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primarySage,
  },
  kisanAiBtnText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.primarySage,
  },
});
