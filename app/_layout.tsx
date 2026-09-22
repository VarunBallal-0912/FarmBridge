import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.screenBg },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="crop-details"
          options={{
            headerShown: true,
            headerTitle: 'Crop Price Details',
            headerStyle: { backgroundColor: Colors.screenBg },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '600', color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="compare"
          options={{
            headerShown: true,
            headerTitle: 'Compare Mandi Prices',
            headerStyle: { backgroundColor: Colors.screenBg },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '600', color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="disease"
          options={{
            headerShown: true,
            headerTitle: 'Crop Disease Detection',
            headerStyle: { backgroundColor: Colors.screenBg },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '600', color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="schemes"
          options={{
            headerShown: true,
            headerTitle: 'Government Schemes',
            headerStyle: { backgroundColor: Colors.screenBg },
            headerTintColor: Colors.textPrimary,
            headerTitleStyle: { fontWeight: '600', color: Colors.textPrimary },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </>
  );
}
