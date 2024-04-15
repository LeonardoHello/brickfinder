import { Pressable } from "react-native";

import { Link, Tabs } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";
import { AntDesign } from "@expo/vector-icons";

import Colors from "@/lib/constants/Colors";

export default function TabLayout() {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerStyle: {
          backgroundColor: Colors.header.background,
        },
        headerTitleStyle: {
          fontFamily: "Inter-Medium",
        },
        headerTintColor: Colors.header.tint,
        tabBarStyle: {
          backgroundColor: Colors.tabBar.background,
          borderTopColor: Colors.tabBar.border,
        },
        tabBarItemStyle: { padding: 2 },
        tabBarInactiveTintColor: Colors.tabBar.inactivetTint,
        tabBarActiveTintColor: Colors.tabBar.activetTint,
        headerRight: () => {
          if (isSignedIn) {
            return (
              <Link href="/(app)/(tabs)/settings" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <AntDesign
                      name="user"
                      size={24}
                      style={{
                        marginRight: 15,
                        opacity: pressed ? 0.5 : 1,
                        color: "#f3f4f6",
                      }}
                    />
                  )}
                </Pressable>
              </Link>
            );
          }
          return (
            <Link href="/(app)/sign-in" asChild>
              <Pressable>
                {({ pressed }) => (
                  <AntDesign
                    name="login"
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
          );
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="jobs"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" color={color} size={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
