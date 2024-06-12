import { Stack } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";
import { Spinner, useTheme } from "tamagui";

import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import ScreenLoader from "@/components/ScreenLoader";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function AppLayout() {
  const { background } = useTheme();

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <ScreenLoader />;
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
          headerLeft: () => <Logo isChecked={false} />,
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
      <Stack.Screen
        name="applicants/[id]"
        redirect={!isSignedIn}
        options={{ headerTitle: () => <Spinner /> }}
      />
      <Stack.Screen
        name="applications/[id]"
        redirect={!isSignedIn}
        options={{ headerTitle: () => <Spinner /> }}
      />
      <Stack.Screen
        name="jobs/[id]"
        options={{ headerTitle: () => <Spinner /> }}
      />
      <Stack.Screen name="about-us" options={{ title: "about us" }} />
      <Stack.Screen name="settings" />
    </Stack>
  );
}
