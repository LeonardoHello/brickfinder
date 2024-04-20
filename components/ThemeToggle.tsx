import { Pressable, View } from "react-native";

import * as SystemUI from "expo-system-ui";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { MoonStar, Sun } from "@/components/Icons";
import { NAV_THEME } from "@/lib/constants/Colors";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { setAndroidNavigationBar } from "@/lib/utils/android-navigation-bar";
import { cn } from "@/lib/utils/cn";

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <Pressable
      onPress={() => {
        const newTheme = isDarkColorScheme ? "light" : "dark";
        setColorScheme(newTheme);
        SystemUI.setBackgroundColorAsync(NAV_THEME[newTheme].background);
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem("theme", newTheme);
      }}
      className="web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2"
    >
      {({ pressed }) => (
        <View
          className={cn(
            "aspect-square flex-1 items-start justify-center pt-0.5 web:px-5",
            pressed && "opacity-70",
          )}
        >
          {isDarkColorScheme ? (
            <MoonStar
              className="text-foreground"
              size={23}
              strokeWidth={1.25}
            />
          ) : (
            <Sun className="text-foreground" size={24} strokeWidth={1.25} />
          )}
        </View>
      )}
    </Pressable>
  );
}
