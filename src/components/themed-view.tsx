// Legacy template component — stubbed for Farmbridge
import { View, type ViewProps } from 'react-native';
import { Colors } from '@/constants/theme';

export type ThemeColor = 'textPrimary' | 'textSecondary';

export type ThemedViewProps = ViewProps & {
  type?: 'background' | 'backgroundElement';
  themeColor?: ThemeColor;
};

export function ThemedView({ style, ...rest }: ThemedViewProps) {
  return <View style={[{ backgroundColor: Colors.screenBg }, style]} {...rest} />;
}
