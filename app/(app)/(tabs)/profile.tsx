import { ScrollView, SizableText, XStack, YStack } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";
import ProfileForm from "@/components/ProfileForm";
import Skeleton from "@/components/Skeleton";
import { trpc } from "@/utils/trpc";

export default AuthenticatedHOC(function ProfileScreen({
  userId,
}: {
  userId: string;
}) {
  const { data: currentUser, isLoading } = trpc.user.getById.useQuery(userId, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (!currentUser) {
    throw new Error("Cannot fetch profile screen data.");
  }

  return (
    <ScrollView backgroundColor={"$background075"}>
      <YStack flex={1} padding={"$4"} gap={"$2"}>
        <ProfileForm currentUser={currentUser} />
        {currentUser.updatedAt && (
          <SizableText color={"$accentColor"}>
            Last updated at: {currentUser.updatedAt.toLocaleString("de-DE")}
          </SizableText>
        )}
      </YStack>
    </ScrollView>
  );
});

function SkeletonLoader() {
  return (
    <YStack
      flex={1}
      paddingHorizontal={"$4"}
      paddingVertical={"$6"}
      gap={"$7"}
      backgroundColor={"$background075"}
    >
      <YStack gap={"$3.5"}>
        <Skeleton borderRadius={2} height={15} width={175} />
        <Skeleton borderRadius={5} height={50} />
      </YStack>
      <YStack gap={"$3.5"}>
        <Skeleton borderRadius={2} height={15} width={150} />
        <Skeleton borderRadius={5} height={50} />
      </YStack>
      <YStack gap={"$3.5"}>
        <Skeleton borderRadius={2} height={15} width={225} />
        <Skeleton borderRadius={5} height={50} />
      </YStack>
      <YStack gap={"$3.5"}>
        <Skeleton borderRadius={2} height={15} width={200} />
        <YStack gap={"$2"}>
          <XStack gap={"$2"}>
            <Skeleton width={"75%"} borderRadius={5} height={50} />
            <Skeleton width={"23%"} borderRadius={5} height={50} />
          </XStack>
          <XStack gap={"$2"}>
            <Skeleton width={"75%"} borderRadius={5} height={50} />
            <Skeleton width={"23%"} borderRadius={5} height={50} />
          </XStack>
          <XStack gap={"$2"}>
            <Skeleton width={"75%"} borderRadius={5} height={50} />
            <Skeleton width={"23%"} borderRadius={5} height={50} />
          </XStack>
        </YStack>
      </YStack>
      <Skeleton borderRadius={5} height={40} />
    </YStack>
  );
}
