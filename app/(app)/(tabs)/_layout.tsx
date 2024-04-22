import { Tabs } from "expo-router";

import { Dog, Home, Search } from "@/components/Icons";
import { UserButton } from "@/components/UserButton";
import { useClientOnlyValue } from "@/lib/hooks/useClientOnlyValue";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerTitleStyle: {
          fontFamily: "Inter-Medium",
        },
        tabBarItemStyle: { padding: 2 },
        headerRight: () => <UserButton />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color }) => <Search color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="doggo"
        options={{
          title: "doggo",
          tabBarIcon: ({ color }) => <Dog color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
