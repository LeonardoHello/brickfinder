import { Stack } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";
import { useTheme } from "tamagui";

import Menu from "@/components/Menu";
import ScreenLoader from "@/components/ScreenLoader";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  const { background } = useTheme();
  const backgroundColor = background.get();

  if (!isLoaded) {
    return <ScreenLoader />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor,
        },
        headerTitleStyle: { fontFamily: "Silkscreen" },
        headerRight: () => <Menu />,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="about-us" options={{ title: "about us" }} />
      <Stack.Screen name="settings" />
      <Stack.Screen
        name="sign-in"
        redirect={isSignedIn}
        options={{ title: "sign in", presentation: "modal" }}
      />
    </Stack>
  );
}
