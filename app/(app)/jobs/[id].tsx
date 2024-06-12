import { useEffect } from "react";

import { Stack, useLocalSearchParams, useNavigation } from "expo-router";

import { H1, YStack } from "tamagui";

import ScreenLoader from "@/components/ScreenLoader";
import { trpc } from "@/lib/utils/trpc";

export default function JobScreen() {
  const { id } = useLocalSearchParams();

  const { data: job, isLoading } = trpc.job.getById.useQuery(id as string, {});

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!job) {
    throw new Error("Couldn't fetch job information.");
  }

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor={"$background075"}
    >
      <Stack.Screen options={{ headerTitle: undefined, title: job.title }} />
      <H1>We are very interesting</H1>
    </YStack>
  );
}
