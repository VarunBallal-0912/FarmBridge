// Legacy template file — NOT used for routing.
// Farmbridge uses app/_layout.tsx and app/(tabs)/_layout.tsx for routing.
// This file is kept only to prevent import errors in other legacy files.

import { View } from 'react-native';

export default function LegacyLayout() {
  return <View style={{ flex: 1 }} />;
}
