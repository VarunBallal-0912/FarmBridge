// Legacy template file — not used by Farmbridge routing
// Farmbridge home screen is at: app/(tabs)/home.tsx

import { View, Text } from 'react-native';
import { Colors } from '@/constants/theme';
import { BottomTabInset, MaxContentWidth } from '@/constants/theme';

export default function LegacyHomeScreen() {
  return <View style={{ flex: 1, backgroundColor: Colors.screenBg }} />;
}
