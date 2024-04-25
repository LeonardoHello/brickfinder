import { Stack } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";

import { NAV_THEME } from "@/lib/constants/Colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const { isSignedIn } = useAuth();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontFamily: "Inter-Medium",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="settings" />
      <Stack.Screen name="profile" />
      <Stack.Screen
        name="sign-in"
        redirect={isSignedIn}
        options={{
          // onPress only works if header position is set to absolute (headerTransparent: true)
          headerTransparent: true,
          headerStyle: {
            backgroundColor: isDarkColorScheme
              ? NAV_THEME.dark.card
              : NAV_THEME.light.card,
          },
          presentation: "modal",
          title: "Sign-In",
        }}
      />
    </Stack>
  );
}
