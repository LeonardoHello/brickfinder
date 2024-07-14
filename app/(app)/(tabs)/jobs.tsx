import { FlatList } from "react-native";

import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";

import { Check, ChevronRight, Rat } from "@tamagui/lucide-icons";
import { Separator, YStack } from "tamagui";
import { Avatar, H4, ListItem, SizableText } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";
import JobListSort from "@/components/JobListSort";
import Skeleton from "@/components/Skeleton";
import { RouterOutputs } from "@/lib/trpc/router";
import { ArrElement } from "@/types";
import { trpc } from "@/utils/trpc";

export default AuthenticatedHOC(function JobsScreen({ userId }) {
  const { participant, sortBy, direction } = useLocalSearchParams<{
    participant: "user" | "moderator";
    sortBy: "date" | "salary" | "expiration";
    direction: "asc" | "desc";
  }>();

  const { data: jobs, isLoading } = trpc.job.getAllByUserId.useQuery(userId);

  if (isLoading) {
    return (
      <SkeletonLoader>
        <JobListSort
          pathname="/(app)/(tabs)/jobs"
          participant={participant}
          sortBy={sortBy}
          direction={direction}
        />
      </SkeletonLoader>
    );
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
        gap={"$4"}
      >
        <Rat color={"$gray6"} size={"$20"} strokeWidth={1} />
        <SizableText
          color={"$gray6"}
          maxWidth={"75%"}
          textAlign="center"
          size={"$6"}
          fontFamily={"$silkscreen"}
        >
          No open position avaliable at this moment.
        </SizableText>
      </YStack>
    );
  }

  const sortJobs = () => {
    switch (sortBy) {
      case "salary":
        const sortedBySalary = jobs.sort((a, b) => a.salary - b.salary);

        if (direction === "desc") return sortedBySalary.reverse();
        return sortedBySalary;

      case "expiration":
        const sortedByExpiration = jobs.sort(
          (a, b) => b.expiresAt.getTime() - a.expiresAt.getTime(),
        );

        if (direction === "desc") return sortedByExpiration.reverse();
        return sortedByExpiration;

      default:
        const sortedByDate = jobs.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );

        if (direction === "desc") return sortedByDate.reverse();
        return sortedByDate;
    }
  };

  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"} gap={"$3"}>
      <JobListSort
        pathname="/(app)/(tabs)/jobs"
        participant={participant}
        sortBy={sortBy}
        direction={direction}
      />

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
});

function JobListItem({
  item,
}: {
  item: ArrElement<RouterOutputs["job"]["getAllByUserId"]>;
}) {
  const {
    id,
    expiresAt,
    title,
    location,
    company,
    applications: [application],
  } = item;

  const expirationDate = expiresAt.getTime();
  const currentDate = new Date().getTime();

  const expiresSoon =
    (expirationDate - currentDate) / (1000 * 60 * 60 * 24) <= 7;

  return (
    <Link
      href={{
        pathname: "/(app)/jobsd/[id]",
        params: { id },
      }}
      asChild
    >
      <ListItem
        backgroundColor={"$background"}
        // icon={
        //   <Avatar circular size="$4">
        //     <Avatar.Image
        //       accessibilityLabel="Cam"
        //       src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
        //     />
        //     <Avatar.Fallback backgroundColor="$background" />
        //   </Avatar>
        // }
        bordered
        iconAfter={
          application ? (
            <Check size={"$1.5"} color={"greenyellow"} opacity={0.8} />
          ) : (
            <ChevronRight size={"$1.5"} />
          )
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
          <SizableText size={"$3"} color={expiresSoon ? "$red8" : "darkgray"}>
            Apply until{" "}
            <SizableText
              size={"$3"}
              fontWeight={700}
              color={expiresSoon ? "$red8" : "darkgray"}
            >
              {expiresAt.toLocaleDateString("hr")}
            </SizableText>
          </SizableText>
        </YStack>
      </ListItem>
    </Link>
  );
}

function SkeletonLoader({ children }: { children: React.ReactNode }) {
  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"} gap={"$3"}>
      {children}
      <YStack gap={"$2"}>
        <Skeleton borderRadius={5} height={130} />
        <Skeleton borderRadius={5} height={130} />
        <Skeleton borderRadius={5} height={130} />
        <Skeleton borderRadius={5} height={130} />
        <Skeleton borderRadius={5} height={130} />
      </YStack>
    </YStack>
  );
}
