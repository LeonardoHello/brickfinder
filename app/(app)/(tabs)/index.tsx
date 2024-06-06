import { FlatList } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";
import { Separator, YStack } from "tamagui";

import JobListItem from "@/components/JobListItem";
import JobListSort from "@/components/JobListSort";
import ScreenLoader from "@/components/ScreenLoader";
import { trpc } from "@/lib/utils/trpc";

export default function JobsScreen() {
  const searchParams = useLocalSearchParams();
  const { isSignedIn, isLoaded } = useAuth();

  const { data: jobs, isLoading } = trpc.job.getAll.useQuery(undefined, {
    select: (data) => {
      return data;
    },
  });

  if (isLoading || !isLoaded) {
    return <ScreenLoader />;
  }

  if (!jobs) {
    throw new Error("Cannot fetch jobs screen data.");
  }

  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"} gap={"$3"}>
      <JobListSort
        sort={searchParams.sort}
        direction={searchParams.direction}
      />

      <YStack f={1}>
        <FlatList
          data={jobs}
          ItemSeparatorComponent={() => (
            <Separator borderWidth={0} my={"$1.5"} />
          )}
          renderItem={({ item }) => (
            <JobListItem item={item} isSignedIn={isSignedIn} />
          )}
          keyExtractor={(item) => item.id}
        />
      </YStack>
    </YStack>
  );
}
