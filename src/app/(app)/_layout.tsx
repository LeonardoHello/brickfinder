import { Stack, useGlobalSearchParams } from "expo-router";

import { XStack, useTheme } from "tamagui";

import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import RoleSwitch from "@/components/RoleSwitch";
import { useSession } from "@/context/session";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  const searchParams = useGlobalSearchParams<{ isModerator?: "true" }>();

  const { session } = useSession();
  const { background } = useTheme();

  const isSignedIn = session !== null;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: background.get() },
        headerTitleStyle: { fontFamily: "Silkscreen" },
      }}
    >
      <Stack.Screen
        name="index"
        redirect={isSignedIn}
        options={{
          title: "",
          headerLeft: () => (
            <Logo href={{ pathname: "/", params: searchParams }} />
          ),
          headerRight: () => (
            <Menu searchParams={searchParams} isSignedIn={isSignedIn} />
          ),
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
        options={{
          title: "",
          headerLeft: () => (
            <Logo href={{ pathname: "/jobs", params: searchParams }} />
          ),
          headerRight: () => (
            <XStack gap={"$2"} alignItems="center">
              {session && (
                <RoleSwitch
                  userId={session.user.id}
                  isModerator={searchParams.isModerator === "true"}
                />
              )}

              <Menu searchParams={searchParams} isSignedIn={isSignedIn} />
            </XStack>
          ),
        }}
      />
      <Stack.Screen name="jobs/[id]" options={{ title: "job details" }} />
      <Stack.Screen name="about-us" options={{ title: "about us" }} />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
