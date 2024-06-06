import { Tabs } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";
import { ClipboardCheck, Hammer, User } from "@tamagui/lucide-icons";
import { XStack, useTheme } from "tamagui";

import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import ScreenLoader from "@/components/ScreenLoader";
import { useClientOnlyValue } from "@/lib/hooks/useClientOnlyValue";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  const { background } = useTheme();
  const backgroundColor = background.get();

  if (!isLoaded) {
    return <ScreenLoader />;
  }

  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        headerStyle: { backgroundColor },
        headerTitle: "",
        headerTitleStyle: { fontFamily: "Silkscreen" },
        headerLeft: () => (
          <XStack ml={"$3"}>
            <Logo />
          </XStack>
        ),
        headerRight: () => (
          <XStack mr={"$3"}>
            <Menu />
          </XStack>
        ),
        tabBarStyle: {
          backgroundColor,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: { fontFamily: "Silkscreen" },
        tabBarItemStyle: { padding: 2 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "jobs",
          tabBarIcon: ({ color }) => <Hammer color={color} />,
        }}
      />
      <Tabs.Screen
        name="applications"
        options={{
          tabBarIcon: ({ color }) => <ClipboardCheck color={color} />,
        }}
        redirect={!isSignedIn}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
        redirect={!isSignedIn}
      />
    </Tabs>
  );
}
