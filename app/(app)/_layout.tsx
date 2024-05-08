import { useEffect } from "react";

import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";

import { useAuth } from "@clerk/clerk-expo";
import { useTheme } from "tamagui";

import Menu from "@/components/Menu";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  const { isSignedIn } = useAuth();
  const { background, background05 } = useTheme();

  const backgroundColor = background.get();

  useEffect(() => {
    const background05Color = background05.get();
    SystemUI.setBackgroundColorAsync(background05Color);
  }, []);

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
      <Stack.Screen name="profile" redirect={!isSignedIn} />
      <Stack.Screen
        name="sign-in"
        redirect={isSignedIn}
        options={{
          presentation: "modal",
          title: "Sign-In",
        }}
      />
    </Stack>
  );
}
