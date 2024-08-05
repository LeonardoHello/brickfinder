import { FlatList } from "react-native";

import { Link } from "expo-router";

import { ChevronRight, Rat } from "@tamagui/lucide-icons";
import { H4, ListItem, Separator, SizableText, YStack } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";
import Skeleton from "@/components/Skeleton";
import { RouterOutputs } from "@/lib/trpc/router";
import { ArrElement } from "@/types";
import { trpc } from "@/utils/trpc";

export default AuthenticatedHOC(function ApplicationsScreen({ session }) {
  const { data: applications, isLoading } =
    trpc.application.getAllByUserId.useQuery(session.user.id);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (!applications) {
    throw new Error("Cannot fetch jobs screen data.");
  }

  if (applications.length === 0) {
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
          No applications sent yet.
        </SizableText>
      </YStack>
    );
  }

  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"} gap={"$3"}>
      <FlatList
        data={applications}
        ItemSeparatorComponent={() => <Separator borderWidth={0} my={"$1.5"} />}
        renderItem={({ item }) => <JobListItem item={item} />}
        keyExtractor={(item) => item.jobId}
      />
    </YStack>
  );
});

function JobListItem({
  item,
}: {
  item: ArrElement<RouterOutputs["application"]["getAllByUserId"]>;
}) {
  const { jobId, createdAt, job } = item;

  return (
    <Link
      href={{
        pathname: "/jobs/[id]",
        params: { id: jobId },
      }}
      asChild
    >
      <ListItem
        backgroundColor={"$background"}
        bordered
        iconAfter={<ChevronRight size={"$1.5"} />}
        borderRadius={"$4"}
        animation={"100ms"}
        hoverStyle={{ scale: 0.98 }}
        pressStyle={{ scale: 0.98 }}
        color={"$white025"}
      >
        <YStack f={1} gap={"$0.5"}>
          <H4>{job.title}</H4>
          <SizableText
            size={"$3"}
            fontFamily={"$silkscreen"}
            color={"darkgray"}
          >
            {job.company.name}
          </SizableText>
          <SizableText size={"$3"} color={"$gray8"}>
            {job.location}
          </SizableText>
          <SizableText size={"$3"} color={"greenyellow"} opacity={0.8}>
            Application sent{" "}
            <SizableText
              size={"$3"}
              fontWeight={700}
              color={"greenyellow"}
              opacity={0.8}
            >
              {createdAt.toLocaleDateString("hr")}
            </SizableText>
          </SizableText>
        </YStack>
      </ListItem>
    </Link>
  );
}

function SkeletonLoader() {
  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"} gap={"$2"}>
      <Skeleton borderRadius={5} height={130} />
      <Skeleton borderRadius={5} height={130} />
      <Skeleton borderRadius={5} height={130} />
      <Skeleton borderRadius={5} height={130} />
      <Skeleton borderRadius={5} height={130} />
    </YStack>
  );
}
