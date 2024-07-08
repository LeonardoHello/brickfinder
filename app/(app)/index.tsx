import { FlatList } from "react-native";

import { Link, useLocalSearchParams } from "expo-router";

import { Bird, ChevronRight, EyeOff } from "@tamagui/lucide-icons";
import { Separator, YStack } from "tamagui";
import { Avatar, H4, ListItem, SizableText, XStack } from "tamagui";

import JobListSort from "@/components/JobListSort";
import ScreenLoader from "@/components/ScreenLoader";
import { RouterOutputs } from "@/lib/trpc/router";
import { ArrElement } from "@/types";
import { trpc } from "@/utils/trpc";

export default function JobsScreen() {
  const { sortBy, direction } = useLocalSearchParams<{
    sortBy: "date" | "salary" | "expiration";
    direction: "asc" | "desc";
  }>();

  const { data: jobs, isLoading } = trpc.job.getAll.useQuery(undefined, {});

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!jobs) {
    throw new Error("Cannot fetch jobs screen data.");
  }

  if (jobs.length === 0) {
    return (
      <YStack
        flex={1}
        backgroundColor={"$background075"}
        alignItems="center"
        justifyContent="center"
      >
        <YStack pressStyle={{ transform: "scaleX(-1)" }}>
          <Bird color={"$gray6"} size={"$20"} strokeWidth={1} />
        </YStack>
        <SizableText
          color={"$blue9"}
          size={"$8"}
          style={{ fontFamily: "InterLight" }}
        >
          No available jobs yet.
        </SizableText>
      </YStack>
    );
  }

  const sortJobs = () => {
    if (sortBy === "date") {
      const sortedJobs = jobs.sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
      );

      if (direction === "desc") return sortedJobs.reverse();
      return sortedJobs;
    } else if (sortBy === "salary") {
      const sortedJobs = jobs.sort((a, b) => a.salary - b.salary);

      if (direction === "desc") return sortedJobs.reverse();
      return sortedJobs;
    } else if (sortBy === "expiration") {
      const sortedJobs = jobs.sort(
        (a, b) => a.expiresAt.getTime() - b.expiresAt.getTime(),
      );

      if (direction === "desc") return sortedJobs.reverse();
      return sortedJobs;
    }

    return jobs;
  };

  return (
    <YStack flex={1} p={"$3"} gap={"$3"} backgroundColor={"$background075"}>
      <JobListSort pathname="/(app)/" sortBy={sortBy} direction={direction} />

      <YStack f={1}>
        <FlatList
          data={sortJobs()}
          ItemSeparatorComponent={() => (
            <Separator borderWidth={0} my={"$1.5"} />
          )}
          renderItem={({ item }) => <JobListItem item={item} />}
          keyExtractor={(item) => item.id}
        />
      </YStack>
    </YStack>
  );
}

function JobListItem({
  item,
}: {
  item: ArrElement<RouterOutputs["job"]["getAll"]>;
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
        backgroundColor={"$background"}
        icon={
          <Avatar circular size="$4">
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              blurRadius={15}
            />
            <Avatar.Fallback backgroundColor="$background" />
          </Avatar>
        }
        bordered
        iconAfter={<ChevronRight size={"$1.5"} />}
        borderRadius={"$4"}
        animation={"100ms"}
        hoverStyle={{ scale: 0.98 }}
        pressStyle={{ scale: 0.98 }}
        color={"$white025"}
      >
        <YStack f={1}>
          <H4 mb={"$1"}>{title}</H4>
          <XStack alignItems="center" gap={"$2"}>
            <SizableText
              size={"$3"}
              fontFamily={"$silkscreen"}
              color={"darkgray"}
            >
              hidden
            </SizableText>
            <EyeOff size={"$1"} color={"darkgray"} />
          </XStack>
          <SizableText size={"$3"} color={"$gray8"}>
            {location}
          </SizableText>
        </YStack>
      </ListItem>
    </Link>
  );
}
