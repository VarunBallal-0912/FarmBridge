// Legacy template file — not used by Farmbridge routing (which uses app/(tabs)/_layout.tsx)
// Preserved to avoid breaking imports from src/app/_layout.tsx

import { View } from 'react-native';
import { Colors } from '@/constants/theme';

export default function AppTabs() {
  // Farmbridge uses Expo Router app/(tabs)/_layout.tsx instead
  return <View style={{ flex: 1, backgroundColor: Colors.screenBg }} />;
}
