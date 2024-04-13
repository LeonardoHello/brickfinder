import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";

import "../global.css";
import Colors from "@/lib/constants/Colors";
import { TRPCReactProvider } from "@/trpc/Provider";

export default function RootLayout() {
  SystemUI.setBackgroundColorAsync("#020617");

  return (
    <TRPCReactProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.header.background,
          },
          headerTintColor: Colors.header.tint,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </TRPCReactProvider>
  );
}
