import { Stack } from "expo-router";

import Colors from "@/lib/constants/Colors";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.header.background,
        },
        headerTintColor: Colors.header.tint,
        headerTitleStyle: {
          fontFamily: "Inter-Medium",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "modal",
          title: "Sign-In",
        }}
      />
    </Stack>
  );
}
