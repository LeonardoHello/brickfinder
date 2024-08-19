import { Tabs, useGlobalSearchParams } from "expo-router";

import {
  Briefcase,
  Building,
  ClipboardCheck,
  Hammer,
  User,
  Users,
} from "@tamagui/lucide-icons";
import { useTheme } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";

export default AuthenticatedHOC(function TabsLayout() {
  const searchParams = useGlobalSearchParams<{
    isModerator?: "true";
  }>();

  const { background, purple10 } = useTheme();

  const isModerator = searchParams.isModerator === "true";
  const tabBarActiveTintColor = isModerator ? purple10.get() : undefined;
  const backgroundColor = background.get();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: { fontFamily: "Silkscreen" },
        tabBarItemStyle: { padding: 2 },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="jobs"
        options={{
          href: { pathname: "/jobs", params: searchParams },
          tabBarIcon: ({ color }) =>
            isModerator ? (
              <Briefcase color={color} />
            ) : (
              <Hammer color={color} />
            ),
          tabBarActiveTintColor,
        }}
      />
      <Tabs.Screen
        name="applications"
        options={{
          href: {
            pathname: "/applications",
            params: searchParams,
          },
          tabBarIcon: ({ color }) =>
            isModerator ? (
              <Users color={color} />
            ) : (
              <ClipboardCheck color={color} />
            ),
          tabBarActiveTintColor,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          href: { pathname: "/profile", params: searchParams },
          tabBarIcon: ({ color }) =>
            isModerator ? <Building color={color} /> : <User color={color} />,
          tabBarActiveTintColor,
        }}
      />
    </Tabs>
  );
});
