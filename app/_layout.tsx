import { useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";

import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalProvider } from "@tamagui/portal";
import { ToastProvider } from "@tamagui/toast";
import { TamaguiProvider, Theme } from "tamagui";

import { tamaguiConfig } from "../tamagui.config";
import SafeToastViewport from "@/components/SafeToastViewport";
import Toast from "@/components/Toast";
import { TRPCProvider } from "@/lib/trpc/Provider";

if (Platform.OS === "web") {
  // @ts-expect-error
  import("../tamagui-web.css");
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env",
  );
}

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

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <TRPCProvider>
          <SafeAreaProvider>
            <TamaguiProvider
              config={tamaguiConfig}
              defaultTheme={colorScheme as any}
            >
              <ThemeProvider
                value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
              >
                <Theme name={"gray"}>
                  <ToastProvider native>
                    <PortalProvider shouldAddRootHost>
                      <Slot />
                      <SafeToastViewport />
                      <Toast />
                    </PortalProvider>
                  </ToastProvider>
                </Theme>
              </ThemeProvider>
            </TamaguiProvider>
          </SafeAreaProvider>
        </TRPCProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
