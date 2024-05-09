import { useAuth } from "@clerk/clerk-expo";
import { ScrollView, SizableText, YStack } from "tamagui";

import UserProfileForm from "@/components/UserProfileForm";
import { trpc } from "@/lib/utils/trpc";

export default function ProfileScreen() {
  const { userId } = useAuth();

  if (!userId) {
    throw new Error("Cannot access profile page without authentication.");
  }

  const { data: currentUser, isLoading } = trpc.user.getById.useQuery(userId);

  if (isLoading) {
    return <SizableText>Loading...</SizableText>;
  }

  if (!currentUser) {
    throw new Error("Cannot fetch user information.");
  }

  return (
    <ScrollView backgroundColor={"$background075"}>
      <YStack flex={1} padding={"$4"} gap={"$2"}>
        <UserProfileForm currentUser={currentUser} />
        {currentUser.updatedAt && (
          <SizableText color={"$accentColor"}>
            Last updated at: {currentUser.updatedAt.toLocaleString("de-DE")}
          </SizableText>
        )}
      </YStack>
    </ScrollView>
  );
}
