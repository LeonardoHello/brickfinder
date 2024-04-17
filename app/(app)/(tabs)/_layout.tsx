import { Link, Tabs } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";

import { Home, LogIn, Search, Settings } from "@/components/Icons";
import { SignOut } from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import { useClientOnlyValue } from "@/lib/hooks/useClientOnlyValue";

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
            return <SignOut />;
          }
          return (
            <Link href="/(app)/sign-in" asChild>
              <Button className="mr-2" size="icon" variant="ghost">
                <LogIn className="text-foreground" />
              </Button>
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
