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
    refetchOnMount: false,
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
      <Stack.Screen name="profile" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="about-us" options={{ title: "about us" }} />
      <Stack.Screen name="applications" />
      <Stack.Screen
        name="your-companies"
        options={{ title: "your companies" }}
        redirect={isNotOwner}
      />
      <Stack.Screen name="applicants" redirect={isNotOwner} />
      <Stack.Screen
        name="sign-in"
        redirect={isSignedIn}
        options={{ presentation: "modal" }}
      />
    </Stack>
  );
}
