import { Stack } from "expo-router";

import { H1, YStack } from "tamagui";

import AuthenticatedScreen from "@/components/AuthenticatedScreen";
import ScreenLoader from "@/components/ScreenLoader";
import { trpc } from "@/lib/utils/trpc";

export default AuthenticatedScreen(function CompanyScreen({ userId }) {
  const { data: moderator, isLoading } =
    trpc.moderator.getById.useQuery(userId);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor={"$background075"}
    >
      <Stack.Screen name="company" redirect={!moderator} />

      <H1>Much empty</H1>
    </YStack>
  );
});
