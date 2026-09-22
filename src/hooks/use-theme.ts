// Legacy hook — stubbed for Farmbridge which uses flat Colors object
import { Colors } from '@/constants/theme';

export function useTheme() {
  return Colors; // Return flat Colors object — no light/dark in Farmbridge
}
