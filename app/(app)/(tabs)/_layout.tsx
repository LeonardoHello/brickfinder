import { useEffect, useState } from "react";

import { Tabs } from "expo-router";

import {
  Briefcase,
  Building,
  ClipboardCheck,
  Hammer,
  User,
  Users,
} from "@tamagui/lucide-icons";
import { XStack, useTheme } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import ScreenLoader from "@/components/ScreenLoader";
import { Switch } from "@/components/Switch";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { trpc } from "@/utils/trpc";

export default AuthenticatedHOC(function TabsLayout({ userId }) {
  const [checked, setChecked] = useState(false);

  const { background, purple10 } = useTheme();

  const { data: moderator, isLoading } =
    trpc.moderator.getById.useQuery(userId);

  useEffect(() => {
    if (!!moderator) {
      setChecked(true);
    }
  }, [isLoading]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  const backgroundColor = background.get();
  const tabBarActiveTintColor = purple10.get();

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
          <XStack ml={"$3.5"}>
            <Logo isSignedIn isChecked={checked} />
          </XStack>
        ),
        tabBarHideOnKeyboard: true,
        headerRight: () => (
          <XStack mr={"$3.5"} gap={"$2"} alignItems="center">
            {moderator && (
              <Switch
                size={"$3"}
                checked={checked}
                onCheckedChange={setChecked}
              >
                <Switch.Icon placement="left">
                  <Building color="#fff" />
                </Switch.Icon>
                <Switch.Icon placement="right">
                  <User color="#fff" />
                </Switch.Icon>
                <Switch.Thumb />
              </Switch>
            )}
            <Menu isSignedIn={true} />
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
        name="jobs"
        redirect={checked}
        options={{
          tabBarIcon: ({ color }) => <Hammer color={color} />,
        }}
      />
      <Tabs.Screen
        name="applications"
        redirect={checked}
        options={{
          tabBarIcon: ({ color }) => <ClipboardCheck color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        redirect={checked}
        options={{
          tabBarIcon: ({ color }) => <User color={color} />,
        }}
      />

      {/* Moderator */}
      <Tabs.Screen
        name="company-jobs"
        redirect={!checked}
        options={{
          title: "company jobs",
          tabBarIcon: ({ color }) => <Briefcase color={color} />,
          tabBarActiveTintColor,
        }}
      />
      <Tabs.Screen
        name="applicants"
        redirect={!checked}
        options={{
          tabBarIcon: ({ color }) => <Users color={color} />,
          tabBarActiveTintColor,
        }}
      />
      <Tabs.Screen
        name="company"
        redirect={!checked}
        options={{
          tabBarIcon: ({ color }) => <Building color={color} />,
          tabBarActiveTintColor,
        }}
      />
    </Tabs>
  );
});
