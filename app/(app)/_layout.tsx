import { useEffect } from "react";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useAuth } from "@clerk/clerk-expo";
import { useTheme } from "tamagui";

import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import ScreenLoader from "@/components/ScreenLoader";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  const { background } = useTheme();

  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return null;
  }

  const backgroundColor = background.get();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor },
        headerTitleStyle: { fontFamily: "Silkscreen" },
      }}
    >
      <Stack.Screen
        name="index"
        redirect={isSignedIn}
        options={{
          title: "",
          headerLeft: () => <Logo />,
          headerRight: () => <Menu isSignedIn={false} />,
        }}
      />
      <Stack.Screen
        name="sign-in"
        redirect={isSignedIn}
        options={{
          title: "sign in",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(tabs)"
        redirect={!isSignedIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="jobs/[id]" options={{ title: "job details" }} />
      <Stack.Screen name="about-us" options={{ title: "about us" }} />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
