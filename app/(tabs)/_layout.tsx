import { Pressable } from "react-native";

import { Link, Tabs } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";

import Colors from "@/lib/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerStyle: {
          backgroundColor: Colors.header.background,
        },
        headerTintColor: Colors.header.tint,
        tabBarStyle: {
          backgroundColor: Colors.tabBar.background,
          borderTopColor: Colors.tabBar.border,
        },
        tabBarInactiveTintColor: Colors.tabBar.inactivetTint,
        tabBarActiveTintColor: Colors.tabBar.activetTint,
        headerTitleStyle: {
          fontFamily: "Inter-Bold",
          fontSize: 28,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="home"
              color={color}
              size={28}
              style={{ marginBottom: -3 }}
            />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                      color: "#f3f4f6",
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              name="cog"
              color={color}
              size={28}
              style={{ marginBottom: -3 }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
