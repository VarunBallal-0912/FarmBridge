// Legacy template component — stubbed for Farmbridge
import { Text, type TextProps } from 'react-native';
import { Colors } from '@/constants/theme';

export type ThemeColor = 'textPrimary' | 'textSecondary';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  return (
    <Text
      style={[{ color: themeColor === 'textSecondary' ? Colors.textSecondary : Colors.textPrimary }, style]}
      {...rest}
    />
  );
}
