import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";

import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";

import { ClerkProvider } from "@clerk/clerk-expo";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TamaguiProvider, Theme } from "tamagui";

import { tamaguiConfig } from "../tamagui.config";
import { tokenCache } from "@/lib/utils/cache";
import { TRPCReactProvider } from "@/trpc/Provider";

if (Platform.OS === "web") {
  // @ts-expect-error
  import("../tamagui-web.css");
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync("hsla(0, 0%, 8.5%, 0.5)");

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded, fontError] = useFonts({
    InterLight: require("@tamagui/font-inter/otf/Inter-Light.otf"),
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterSemiBold: require("@tamagui/font-inter/otf/Inter-SemiBold.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Silkscreen: require("@tamagui/font-silkscreen/files/slkscr.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <TRPCReactProvider>
        <TamaguiProvider
          config={tamaguiConfig}
          defaultTheme={colorScheme as any}
        >
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Theme name={"gray"}>
              <Slot />
            </Theme>
          </ThemeProvider>
        </TamaguiProvider>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
