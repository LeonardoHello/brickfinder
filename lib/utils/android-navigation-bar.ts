import { Platform } from "react-native";

import * as NavigationBar from "expo-navigation-bar";

import { NAV_THEME } from "@/lib/constants/Colors";

export async function setAndroidNavigationBar(theme: "light" | "dark") {
  if (Platform.OS !== "android") return;
  await NavigationBar.setButtonStyleAsync(theme === "dark" ? "light" : "dark");
  await NavigationBar.setBackgroundColorAsync(
    theme === "dark" ? NAV_THEME.dark.card : NAV_THEME.light.card,
  );
}
