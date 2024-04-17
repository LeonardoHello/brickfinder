import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
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
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
