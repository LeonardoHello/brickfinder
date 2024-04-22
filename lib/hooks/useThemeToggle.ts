import * as SystemUI from "expo-system-ui";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "./useColorScheme";
import { NAV_THEME } from "@/lib/constants/Colors";
import { setAndroidNavigationBar } from "@/lib/utils/android-navigation-bar";

export function useThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  const themeToggle = () => {
    const newTheme = isDarkColorScheme ? "light" : "dark";
    setColorScheme(newTheme);
    SystemUI.setBackgroundColorAsync(NAV_THEME[newTheme].background);
    setAndroidNavigationBar(newTheme);
    AsyncStorage.setItem("theme", newTheme);
  };

  return { isDarkColorScheme, themeToggle };
}
