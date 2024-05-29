import { useEffect } from "react";

import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";

import { useAuth } from "@clerk/clerk-expo";
import { useTheme } from "tamagui";

import Menu from "@/components/Menu";
import { trpc } from "@/lib/utils/trpc";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  const { isSignedIn, userId } = useAuth();

  const { background, background05 } = useTheme();
  const backgroundColor = background.get();

  useEffect(() => {
    const background05Color = background05.get();
    SystemUI.setBackgroundColorAsync(background05Color);
  }, []);

  const { data: companies } = trpc.company.getByUserId.useQuery(userId, {
    refetchOnWindowFocus: false,
  });

  const isNotOwner = !companies || companies.length === 0;

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
      <Stack.Screen
        name="applicants/index"
        redirect={isNotOwner}
        options={{ title: "applicants" }}
      />
      <Stack.Screen name="company" redirect={isNotOwner} />
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
