import { FlatList } from "react-native";

import { Link, useGlobalSearchParams } from "expo-router";

import { ChevronRight, EyeOff, Rat } from "@tamagui/lucide-icons";
import { Separator, YStack } from "tamagui";
import { H4, ListItem, SizableText, XStack } from "tamagui";

import JobListSort from "@/components/JobListSort";
import Skeleton from "@/components/Skeleton";
import { RouterOutputs } from "@/lib/trpc/router";
import { ArrElement } from "@/types";
import { trpc } from "@/utils/trpc";

export default function JobsScreen() {
  const searchParams = useGlobalSearchParams<{
    sortBy?: "date" | "salary" | "expiration";
    direction?: "asc" | "desc";
    isModerator?: "true";
  }>();

  const { data: jobs, isLoading } = trpc.job.getAll.useQuery();

  if (isLoading) {
    return <SkeletonLoader />;
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
          color={"$gray8"}
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
    switch (searchParams.sortBy) {
      case "salary":
        const sortedBySalary = jobs.sort((a, b) => a.salary - b.salary);

        if (searchParams.direction === "desc") return sortedBySalary.reverse();
        return sortedBySalary;

      case "expiration":
        const sortedByExpiration = jobs.sort(
          (a, b) => b.expiresAt.getTime() - a.expiresAt.getTime(),
        );

        if (searchParams.direction === "desc")
          return sortedByExpiration.reverse();
        return sortedByExpiration;

      default:
        const sortedByDate = jobs.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        );

        if (searchParams.direction === "desc") return sortedByDate.reverse();
        return sortedByDate;
    }
  };

  return (
    <YStack flex={1} p={"$3"} gap={"$3"} backgroundColor={"$background075"}>
      <JobListSort pathname="/" searchParams={searchParams} />

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
  const { id, expiresAt, title, location } = item;

  const expirationDate = expiresAt.getTime();
  const currentDate = new Date().getTime();

  const expiresSoon =
    (expirationDate - currentDate) / (1000 * 60 * 60 * 24) <= 7;

  return (
    <Link
      href={{
        pathname: "/jobs/[id]",
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
        //       blurRadius={15}
        //     />
        //     <Avatar.Fallback backgroundColor="$background" />
        //   </Avatar>
        // }
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

function SkeletonLoader() {
  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"} gap={"$3"}>
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
