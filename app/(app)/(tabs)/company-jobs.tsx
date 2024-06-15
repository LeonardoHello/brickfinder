import { FlatList } from "react-native";

import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";

import { ChevronRight, Squirrel } from "@tamagui/lucide-icons";
import { Separator, YStack } from "tamagui";
import { H4, ListItem, SizableText } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";
import JobListSort from "@/components/JobListSort";
import ScreenLoader from "@/components/ScreenLoader";
import type { ArrElement } from "@/lib/types";
import { trpc } from "@/lib/utils/trpc";
import type { RouterOutputs } from "@/trpc/routers";

export default AuthenticatedHOC(function JobsScreen({ userId }) {
  const searchParams = useLocalSearchParams();

  const { data: moderator, isLoading } =
    trpc.moderator.getById.useQuery(userId);

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!moderator) {
    throw new Error("Cannot fetch jobs screen data.");
  }

  if (moderator.company.jobs.length === 0) {
    return (
      <YStack
        flex={1}
        backgroundColor={"$background075"}
        alignItems="center"
        justifyContent="center"
      >
        <YStack pressStyle={{ transform: "scaleX(-1)" }}>
          <Squirrel color={"$purple10"} size={"$20"} strokeWidth={1} />
        </YStack>
        <SizableText
          color={"$purple10"}
          size={"$8"}
          style={{ fontFamily: "InterLight" }}
        >
          No jobs created yet.
        </SizableText>
      </YStack>
    );
  }

  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"} gap={"$3"}>
      <JobListSort
        pathname="/(app)/(tabs)/company-jobs"
        sort={searchParams.sort}
        direction={searchParams.direction}
      />

      <YStack f={1}>
        <FlatList
          data={moderator.company.jobs}
          ItemSeparatorComponent={() => (
            <Separator borderWidth={0} my={"$1.5"} />
          )}
          renderItem={({ item }) => <JobListItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      </YStack>
    </YStack>
  );
});

function JobListItem({
  item,
}: {
  item: ArrElement<
    NonNullable<RouterOutputs["moderator"]["getById"]>["company"]["jobs"]
  >;
}) {
  const { id, title, location } = item;

  return (
    <Link
      href={{
        pathname: "/(app)/jobs/[id]",
        params: { id },
      }}
      asChild
    >
      <ListItem
        bordered
        iconAfter={<ChevronRight size={"$1.5"} />}
        borderRadius={"$4"}
        animation={"100ms"}
        hoverStyle={{ scale: 0.98 }}
        pressStyle={{ scale: 0.98 }}
        color={"$white025"}
      >
        <YStack f={1}>
          <H4>{title}</H4>
          <SizableText size={"$3"} color={"$gray8"}>
            {location}
          </SizableText>
        </YStack>
      </ListItem>
    </Link>
  );
}
