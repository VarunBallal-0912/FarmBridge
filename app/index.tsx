import { Redirect } from 'expo-router';

// Redirect root to tabs (home tab)
export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}