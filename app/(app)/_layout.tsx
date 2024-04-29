import { Stack } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const { isSignedIn } = useAuth();

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
