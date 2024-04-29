import { Tabs } from "expo-router";

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
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
        }}
      />
      <Tabs.Screen
        name="doggo"
        options={{
          title: "doggo",
        }}
      />
    </Tabs>
  );
}
