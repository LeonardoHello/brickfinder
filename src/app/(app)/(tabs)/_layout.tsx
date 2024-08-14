import { Tabs, useGlobalSearchParams, useRouter } from "expo-router";

import {
  Briefcase,
  Building,
  ClipboardCheck,
  Hammer,
  User as UserIcon,
  Users,
} from "@tamagui/lucide-icons";
import { Button, Spinner, XStack, useTheme } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";
import Logo from "@/components/Logo";
import Menu from "@/components/Menu";
import { Switch } from "@/components/Switch";
import { User } from "@/db/schema";
import { useClientOnlyValue } from "@/hooks/useClientOnlyValue";
import { trpc } from "@/utils/trpc";

export default AuthenticatedHOC(function TabsLayout({ session }) {
  const searchParams = useGlobalSearchParams<{
    isModerator: "true";
  }>();
  const isModerator = searchParams.isModerator === "true";

  const { background, purple10 } = useTheme();

  const backgroundColor = background.get();
  const tabBarActiveTintColor = isModerator ? purple10.get() : undefined;

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
            <Logo href={{ pathname: "/jobs", params: searchParams }} />
          </XStack>
        ),
        headerRight: () => (
          <HeaderRight userId={session.user.id} isModerator={isModerator} />
        ),
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
          href: { pathname: "/(app)/(tabs)/jobs", params: searchParams },
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
            pathname: "/(app)/(tabs)/applications",
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
          href: { pathname: "/(app)/(tabs)/profile", params: searchParams },
          tabBarIcon: ({ color }) =>
            isModerator ? (
              <Building color={color} />
            ) : (
              <UserIcon color={color} />
            ),
          tabBarActiveTintColor,
        }}
      />
    </Tabs>
  );
});

function HeaderRight({
  userId,
  isModerator,
}: {
  userId: User["id"];
  isModerator: boolean;
}) {
  const router = useRouter();

  const { data: moderator, isLoading } =
    trpc.moderator.getExistanceById.useQuery(userId);

  if (isLoading) {
    return (
      <XStack mr={"$3.5"} gap={"$2"} alignItems="center">
        <Button
          icon={Spinner}
          height={"$3.5"}
          borderWidth={"$1"}
          borderRadius={100_000}
          chromeless
        />
      </XStack>
    );
  }

  return (
    <XStack mr={"$3.5"} gap={"$2"} alignItems="center">
      {!!moderator && (
        <Switch
          size={"$3"}
          checked={isModerator}
          onCheckedChange={(checked) => {
            if (checked) {
              router.setParams({ isModerator: "true" });
            } else {
              router.setParams({ isModerator: undefined });
            }
          }}
        >
          <Switch.Icon placement="left">
            <Building color="#fff" />
          </Switch.Icon>
          <Switch.Icon placement="right">
            <UserIcon color="#fff" />
          </Switch.Icon>
          <Switch.Thumb />
        </Switch>
      )}

      <Menu isSignedIn />
    </XStack>
  );
}
