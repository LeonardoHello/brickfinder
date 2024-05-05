import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { SplashScreen } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { ClerkProvider } from "@clerk/clerk-expo";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { TamaguiProvider, Theme } from "tamagui";

// import "../tamagui-web.css";
import { tamaguiConfig } from "../tamagui.config";
import { TRPCReactProvider } from "@/trpc/Provider";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
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

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    Silkscreen: require("@tamagui/font-silkscreen/files/slkscr.ttf"),
    ...FontAwesome6.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
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
