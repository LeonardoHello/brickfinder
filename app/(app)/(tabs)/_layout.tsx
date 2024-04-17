import { Pressable } from "react-native";

import { Link, Tabs } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";

import { Home, LogIn, LogOut, Search, Settings } from "@/components/Icons";
import { useClientOnlyValue } from "@/lib/hooks/useClientOnlyValue";
import { cn } from "@/lib/utils/cn";

export default function TabLayout() {
  const { isSignedIn } = useAuth();

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
        headerRight: () => {
          if (isSignedIn) {
            return (
              <Pressable>
                {({ pressed }) => (
                  <LogOut
                    className={cn("mr-4", {
                      "opacity-50": pressed,
                    })}
                  />
                )}
              </Pressable>
            );
          }
          return (
            <Link href="/(app)/sign-in" asChild>
              <Pressable>
                {({ pressed }) => (
                  <LogIn
                    className={cn("mr-4 text-foreground", {
                      "opacity-50": pressed,
                    })}
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
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings color={color} size={28} />,
        }}
      />
    </Tabs>
  );
}
