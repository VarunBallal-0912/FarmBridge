import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Typography, Shadow } from '@/constants/theme';
import { Home, Store, Bot, User, type LucideIcon } from 'lucide-react-native';

type CustomTabBarProps = Parameters<NonNullable<React.ComponentProps<typeof Tabs>['tabBar']>>[0];

interface TabItemConfig {
  icon: LucideIcon;
  label: string;
}

const TAB_CONFIG: Record<string, TabItemConfig> = {
  home: { icon: Home, label: 'Home' },
  prices: { icon: Store, label: 'Prices' },
  ai: { icon: Bot, label: 'Kisan AI' },
  you: { icon: User, label: 'Profile' },
};

function CustomTabBar({ state, descriptors, navigation, insets }: CustomTabBarProps) {
  const safeAreaInsets = useSafeAreaInsets();
  const bottomPadding = Math.max(
    safeAreaInsets.bottom,
    insets?.bottom ?? 0,
    Platform.OS === 'ios' ? 16 : 8
  );

  return (
    <View style={[styles.tabBar, { paddingBottom: bottomPadding }]}>
      <View style={styles.tabBarRow}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const { options } = descriptors[route.key];
          const config = TAB_CONFIG[route.name] ?? { icon: Home, label: route.name };
          const IconComponent = config.icon;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const activeColor = Colors.primarySage;
          const inactiveColor = Colors.textSecondary;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? config.label}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              <View style={[styles.tabItem, isFocused && styles.tabItemFocused]}>
                <IconComponent
                  size={20}
                  color={isFocused ? activeColor : inactiveColor}
                  strokeWidth={isFocused ? 2.4 : 1.8}
                />
                <Text
                  style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}
                  numberOfLines={1}
                >
                  {config.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="prices"
        options={{
          title: 'Prices',
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'AI',
        }}
      />
      <Tabs.Screen
        name="you"
        options={{
          title: 'You',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 8,
    ...Shadow.elevated,
  },
  tabBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 58,
    gap: 3,
  },
  tabItemFocused: {
    backgroundColor: Colors.primarySage + '18',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: Typography.medium,
    color: Colors.textSecondary,
    textAlign: 'center',
    includeFontPadding: false,
  },
  tabLabelFocused: {
    color: Colors.primarySage,
    fontWeight: Typography.semibold,
  },
});
