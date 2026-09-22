import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Radius } from '@/constants/theme';
import {
  Sprout,
  Wheat,
  Flame,
  Droplets,
  Apple,
  Carrot,
  Leaf,
  Layers,
  type LucideIcon,
} from 'lucide-react-native';

interface CropBadgeProps {
  cropId?: string;
  category?: string;
  size?: 'small' | 'normal' | 'large';
}

function getCropVisuals(cropId?: string, category?: string): {
  Icon: LucideIcon;
  bgColor: string;
  iconColor: string;
} {
  const id = cropId?.toLowerCase() ?? '';
  const cat = category?.toLowerCase() ?? '';

  if (id === 'wheat' || id === 'rice' || cat === 'grain') {
    return { Icon: Wheat, bgColor: '#F6EFE5', iconColor: '#8C7456' };
  }
  if (id === 'chilli' || id === 'garlic' || cat === 'spice') {
    return { Icon: Flame, bgColor: '#FBECE8', iconColor: '#B2533E' };
  }
  if (id === 'soybean' || id === 'cotton' || cat === 'oilseed') {
    return { Icon: Droplets, bgColor: '#EEF3EC', iconColor: '#587354' };
  }
  if (id === 'banana' || cat === 'fruit') {
    return { Icon: Apple, bgColor: '#F9F1E6', iconColor: '#96743A' };
  }
  if (id === 'onion' || id === 'potato') {
    return { Icon: Sprout, bgColor: '#EAF0E7', iconColor: Colors.primarySage };
  }
  if (id === 'tomato' || cat === 'vegetable') {
    return { Icon: Carrot, bgColor: '#EAF0E7', iconColor: Colors.primarySage };
  }

  return { Icon: Leaf, bgColor: '#EAF0E7', iconColor: Colors.primarySage };
}

export function CropBadge({ cropId, category, size = 'normal' }: CropBadgeProps) {
  const { Icon, bgColor, iconColor } = getCropVisuals(cropId, category);

  const dimension = size === 'small' ? 32 : size === 'large' ? 52 : 42;
  const iconSize = size === 'small' ? 16 : size === 'large' ? 26 : 22;
  const borderRadius = size === 'small' ? Radius.sm : Radius.md;

  return (
    <View
      style={[
        styles.badge,
        {
          width: dimension,
          height: dimension,
          borderRadius,
          backgroundColor: bgColor,
        },
      ]}
    >
      <Icon size={iconSize} color={iconColor} strokeWidth={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
});
