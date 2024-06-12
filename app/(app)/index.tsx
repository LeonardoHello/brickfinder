import { FlatList } from "react-native";

import { useLocalSearchParams } from "expo-router";

import { ChevronRight, EyeOff } from "@tamagui/lucide-icons";
import { Separator, Theme, YStack } from "tamagui";
import { Avatar, H4, ListItem, SizableText, XStack } from "tamagui";

import JobListSort from "@/components/JobListSort";
import ScreenLoader from "@/components/ScreenLoader";
import { ArrElement } from "@/lib/types";
import { trpc } from "@/lib/utils/trpc";
import type { RouterOutputs } from "@/trpc/routers";

export default function JobsScreen() {
  const searchParams = useLocalSearchParams();

  const { data: jobs, isLoading } = trpc.job.getAll.useQuery(undefined, {});

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (!jobs) {
    throw new Error("Cannot fetch jobs screen data.");
  }

  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"} gap={"$3"}>
      <JobListSort
        pathname="/(app)/"
        sort={searchParams.sort}
        direction={searchParams.direction}
      />

      <YStack f={1}>
        <FlatList
          data={jobs}
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
  const { title, location } = item;

  return (
    <Theme>
      <ListItem
        backgroundColor={"$background"}
        icon={
          <Avatar circular size="$4">
            <EyeOff />
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              blurRadius={15}
              opacity={0.6}
            />
            <Avatar.Fallback backgroundColor="$background" />
          </Avatar>
        }
        bordered
        iconAfter={<ChevronRight size={"$1.5"} />}
        borderRadius={"$4"}
        animation={"100ms"}
        color={"$white025"}
      >
        <YStack f={1}>
          <H4 mb={"$1"}>{title}</H4>
          <XStack alignItems="center" gap={"$2"}>
            <SizableText
              size={"$3"}
              fontFamily={"$silkscreen"}
              color={"$gray10"}
            >
              hidden
            </SizableText>
            <EyeOff size={"$1"} color={"$gray10"} />
          </XStack>
          <SizableText size={"$3"} color={"$gray8"}>
            {location}
          </SizableText>
        </YStack>
      </ListItem>
    </Theme>
  );
}
