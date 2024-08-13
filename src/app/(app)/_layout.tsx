import { Stack } from "expo-router";

import { useTheme } from "tamagui";

import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import { useSession } from "@/context/session";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  const { background } = useTheme();

  const { session } = useSession();
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
          headerLeft: () => <Logo href={{ pathname: "/" }} />,
          headerRight: () => <Menu />,
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
