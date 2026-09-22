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
import { StatusBadge } from '@/components/ui/States';
import {
  User,
  MapPin,
  Sprout,
  Bookmark,
  Store,
  Search,
  Bell,
  Settings,
  ChevronRight,
  BarChart3,
  Landmark,
  ShieldAlert,
  CheckCircle2,
} from 'lucide-react-native';

const MENU_ITEMS = [
  { icon: Sprout, label: 'My Crops', subtitle: 'Manage your crop list', route: null },
  { icon: Bookmark, label: 'Saved Prices', subtitle: 'Prices you are tracking', route: null },
  { icon: Store, label: 'Saved Mandis', subtitle: 'Your favourite mandis', route: null },
  { icon: Search, label: 'My Searches', subtitle: 'Recent searches and history', route: null },
  { icon: Bell, label: 'Notifications', subtitle: 'Price alerts and updates', route: null },
  { icon: Settings, label: 'Settings', subtitle: 'Language, location, preferences', route: null },
];

export default function YouScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>You</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <User size={30} color={Colors.white} strokeWidth={2} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Ramesh Patil</Text>
            <View style={styles.locationRow}>
              <MapPin size={13} color={Colors.textSecondary} strokeWidth={2} />
              <Text style={styles.profileLocation}>Pune, Maharashtra</Text>
            </View>
            <View style={{ marginTop: 6 }}>
              <StatusBadge label="Verified Farmer" variant="success" icon={CheckCircle2} />
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.8}>
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
          {MENU_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <React.Fragment key={item.label}>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                  <View style={styles.menuIconContainer}>
                    <IconComponent size={18} color={Colors.primarySage} strokeWidth={2} />
                  </View>
                  <View style={styles.menuText}>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  <ChevronRight size={18} color={Colors.textMuted} strokeWidth={2} />
                </TouchableOpacity>
                {index < MENU_ITEMS.length - 1 && <View style={styles.menuDivider} />}
              </React.Fragment>
            );
          })}
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
              <View style={[styles.shortcutIconWrap, { backgroundColor: '#E8F0FE' }]}>
                <BarChart3 size={20} color="#1A73E8" strokeWidth={2} />
              </View>
              <Text style={styles.shortcutLabel}>Compare Prices</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shortcutBtn}
              onPress={() => router.push('/schemes')}
              activeOpacity={0.8}
            >
              <View style={[styles.shortcutIconWrap, { backgroundColor: '#FEF7E0' }]}>
                <Landmark size={20} color="#E37400" strokeWidth={2} />
              </View>
              <Text style={styles.shortcutLabel}>Schemes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shortcutBtn}
              onPress={() => router.push('/disease')}
              activeOpacity={0.8}
            >
              <View style={[styles.shortcutIconWrap, { backgroundColor: '#E6F4EA' }]}>
                <ShieldAlert size={20} color="#137333" strokeWidth={2} />
              </View>
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
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.card,
    marginBottom: Spacing.md,
  },
  avatarLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primarySage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: { flex: 1 },
  profileName: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
    color: Colors.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  profileLocation: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
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
    borderWidth: 1,
    borderColor: Colors.borderLight,
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
    borderWidth: 1,
    borderColor: Colors.borderLight,
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
    backgroundColor: Colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Shadow.card,
  },
  shortcutIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  shortcutLabel: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    fontWeight: Typography.medium,
  },
});
