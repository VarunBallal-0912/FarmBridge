import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadow } from '@/constants/theme';

const MENU_ITEMS = [
  { icon: '🌾', label: 'My Crops', subtitle: 'Manage your crop list', route: null },
  { icon: '📌', label: 'Saved Prices', subtitle: 'Prices you are tracking', route: null },
  { icon: '🏪', label: 'Saved Mandis', subtitle: 'Your favourite mandis', route: null },
  { icon: '🔍', label: 'My Searches', subtitle: 'Recent searches', route: null },
  { icon: '🔔', label: 'Notifications', subtitle: 'Price alerts and updates', route: null },
  { icon: '⚙️', label: 'Settings', subtitle: 'Language, location, preferences', route: null },
];

export default function YouScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>You</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarEmoji}>👨‍🌾</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Ramesh Patil</Text>
            <Text style={styles.profileLocation}>📍 Pune, Maharashtra</Text>
            <View style={styles.profileBadge}>
              <Text style={styles.profileBadgeText}>Verified Farmer</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>My Crops</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Saved Mandis</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Price Alerts</Text>
          </View>
        </View>

        {/* Menu */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <React.Fragment key={item.label}>
              <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                <View style={styles.menuIconContainer}>
                  <Text style={styles.menuIcon}>{item.icon}</Text>
                </View>
                <View style={styles.menuText}>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                <Text style={styles.menuArrow}>›</Text>
              </TouchableOpacity>
              {index < MENU_ITEMS.length - 1 && <View style={styles.menuDivider} />}
            </React.Fragment>
          ))}
        </View>

        {/* Quick shortcuts */}
        <View style={styles.shortcutsSection}>
          <Text style={styles.shortcutsTitle}>Quick Shortcuts</Text>
          <View style={styles.shortcutsRow}>
            <TouchableOpacity
              style={styles.shortcutBtn}
              onPress={() => router.push('/compare')}
              activeOpacity={0.8}
            >
              <Text style={styles.shortcutEmoji}>📊</Text>
              <Text style={styles.shortcutLabel}>Compare Prices</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shortcutBtn}
              onPress={() => router.push('/schemes')}
              activeOpacity={0.8}
            >
              <Text style={styles.shortcutEmoji}>🏛️</Text>
              <Text style={styles.shortcutLabel}>Schemes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shortcutBtn}
              onPress={() => router.push('/disease')}
              activeOpacity={0.8}
            >
              <Text style={styles.shortcutEmoji}>🌿</Text>
              <Text style={styles.shortcutLabel}>Disease Check</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.screenBg },
  scroll: { flex: 1 },
  content: { padding: Spacing.base },
  pageTitle: {
    fontSize: Typography.xxl,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  profileCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...Shadow.card,
    marginBottom: Spacing.md,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 34 },
  profileInfo: { flex: 1 },
  profileName: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  profileLocation: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    marginTop: 3,
  },
  profileBadge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: Colors.lightGreen + '40',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  profileBadgeText: {
    fontSize: Typography.xs,
    color: Colors.primarySage,
    fontWeight: Typography.semibold,
  },
  editBtn: {
    backgroundColor: Colors.screenBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  editBtnText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    fontWeight: Typography.medium,
  },
  statsRow: {
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    flexDirection: 'row',
    ...Shadow.card,
    marginBottom: Spacing.lg,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.primarySage,
  },
  statLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 4,
  },
  menuCard: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl,
    ...Shadow.card,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    gap: 14,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: Colors.screenBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: { fontSize: 20 },
  menuText: { flex: 1 },
  menuLabel: {
    fontSize: Typography.base,
    fontWeight: Typography.medium,
    color: Colors.textPrimary,
  },
  menuSubtitle: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  menuArrow: {
    fontSize: 22,
    color: Colors.textSecondary,
    fontWeight: Typography.regular,
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginLeft: 68,
  },
  shortcutsSection: { marginBottom: Spacing.base },
  shortcutsTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  shortcutsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  shortcutBtn: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    gap: 6,
    ...Shadow.card,
  },
  shortcutEmoji: { fontSize: 24 },
  shortcutLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: Typography.medium,
  },
});
