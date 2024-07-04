import { FlatList } from "react-native";

import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";

import { Bird, Check, ChevronRight } from "@tamagui/lucide-icons";
import { Separator, YStack } from "tamagui";
import { Avatar, H4, ListItem, SizableText } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";
import JobListSort from "@/components/JobListSort";
import ScreenLoader from "@/components/ScreenLoader";
import { RouterOutputs } from "@/lib/trpc/router";
import { ArrElement } from "@/types";
import { trpc } from "@/utils/trpc";

export default AuthenticatedHOC(function JobsScreen({ userId }) {
  const { sort, direction } = useLocalSearchParams();

  const { data: jobs, isLoading } = trpc.job.getAllByUserId.useQuery(userId);

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

  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"} gap={"$3"}>
      <JobListSort
        pathname="/(app)/(tabs)/jobs"
        sort={sort}
        direction={direction}
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
});

function JobListItem({
  item,
}: {
  item: ArrElement<RouterOutputs["job"]["getAllByUserId"]>;
}) {
  const {
    id,
    title,
    company,
    location,
    applications: [application],
  } = item;

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
            />
            <Avatar.Fallback backgroundColor="$background" />
          </Avatar>
        }
        bordered
        iconAfter={
          application ? <Check size={"$1.5"} /> : <ChevronRight size={"$1.5"} />
        }
        borderRadius={"$4"}
        animation={"100ms"}
        hoverStyle={{ scale: 0.98 }}
        pressStyle={{ scale: 0.98 }}
        color={"$white025"}
      >
        <YStack f={1}>
          <H4>{title}</H4>
          <SizableText
            size={"$3"}
            fontFamily={"$silkscreen"}
            color={"darkgray"}
          >
            {company.name}
          </SizableText>
          <SizableText size={"$3"} color={"$gray8"}>
            {location}
          </SizableText>
        </YStack>
      </ListItem>
    </Link>
  );
}
