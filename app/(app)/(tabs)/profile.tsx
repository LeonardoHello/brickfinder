import { ScrollView, SizableText, YStack } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";
import FormSkeletonLoader from "@/components/FormSkeletonLoader";
import ProfileForm from "@/components/ProfileForm";
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
    return <FormSkeletonLoader />;
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
