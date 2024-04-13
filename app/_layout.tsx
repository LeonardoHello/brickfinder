import { Stack } from "expo-router";

import "./global.css";
import { TRPCReactProvider } from "@/trpc/Provider";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  return (
    <TRPCReactProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </TRPCReactProvider>
  );
}
