import { Tabs } from "expo-router";

import { Home, Search, Settings } from "@tamagui/lucide-icons";
import { useTheme } from "tamagui";

import MenuButton from "@/components/MenuButton";
import { useClientOnlyValue } from "@/lib/hooks/useClientOnlyValue";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTitleStyle: {
          fontFamily: "Inter",
        },
        headerStyle: { backgroundColor: theme.background.val },
        headerRight: () => <MenuButton />,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: { fontFamily: "Inter" },
        tabBarItemStyle: { padding: 2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color }) => <Search color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  );
}
