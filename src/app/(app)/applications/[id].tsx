import { Link, useLocalSearchParams } from "expo-router";

import { ChevronRight } from "@tamagui/lucide-icons";
import { H4, ListItem, ScrollView, SizableText, XStack, YStack } from "tamagui";

import ApplicationForm from "@/components/ApplicationForm";
import AuthenticatedHOC from "@/components/AuthenticatedHOC";
import Skeleton from "@/components/Skeleton";
import { Application } from "@/db/schema";
import { trpc } from "@/utils/trpc";

export default AuthenticatedHOC(function ApplicationScreen({ session }) {
  const { id } = useLocalSearchParams<{ id: Application["jobId"] }>();

  const { data: user, isLoading: isLoadingUser } =
    trpc.user.getApplicationById.useQuery(session.user.id);
  const { data: application, isLoading: isLoadingApplication } =
    trpc.application.getById.useQuery({ userId: session.user.id, jobId: id });
  const { data: job, isLoading: isLoadingJob } = trpc.job.getById.useQuery(id);

  if (isLoadingUser || isLoadingApplication || isLoadingJob) {
    return <SkeletonLoader />;
  }

  if (!user || !job) {
    throw new Error(
      "There was a problem with fetching data for application details screen.",
    );
  }

  return (
    <YStack flex={1} p={"$3"} gap={"$2"} backgroundColor={"$background075"}>
      <Link
        href={{
          pathname: "/jobs/[id]",
          params: { id },
        }}
        asChild
      >
        <ListItem
          bordered
          theme={"yellow"}
          iconAfter={<ChevronRight size={"$1.5"} />}
          borderRadius={"$4"}
          animation={"100ms"}
          hoverStyle={{ scale: 0.98 }}
          pressStyle={{ scale: 0.98 }}
          color={"$white025"}
        >
          <YStack f={1}>
            <H4>{job.title}</H4>
            <SizableText
              size={"$3"}
              fontFamily={"$silkscreen"}
              color={"darkgray"}
            >
              {job.company.name}
            </SizableText>
          </YStack>
        </ListItem>
      </Link>

      <ScrollView>
        <ApplicationForm
          userId={session.user.id}
          jobId={id}
          defaultValues={application ? application : user}
        />
      </ScrollView>
    </YStack>
  );
});

function SkeletonLoader() {
  return (
    <YStack flex={1} p={"$3"} gap={"$7"} backgroundColor={"$background075"}>
      <Skeleton borderRadius={8} height={80} />
      <YStack gap={"$3.5"}>
        <Skeleton borderRadius={2} height={15} width={175} />
        <Skeleton borderRadius={5} height={50} />
      </YStack>
      <YStack gap={"$3.5"}>
        <Skeleton borderRadius={2} height={15} width={150} />
        <Skeleton borderRadius={5} height={50} />
      </YStack>
      <YStack gap={"$3.5"}>
        <Skeleton borderRadius={2} height={15} width={225} />
        <Skeleton borderRadius={5} height={50} />
      </YStack>
      <YStack gap={"$3.5"}>
        <Skeleton borderRadius={2} height={15} width={200} />
        <YStack gap={"$2"}>
          <XStack gap={"$2"}>
            <Skeleton width={"75%"} borderRadius={5} height={50} />
            <Skeleton width={"23%"} borderRadius={5} height={50} />
          </XStack>
          <XStack gap={"$2"}>
            <Skeleton width={"75%"} borderRadius={5} height={50} />
            <Skeleton width={"23%"} borderRadius={5} height={50} />
          </XStack>
          <XStack gap={"$2"}>
            <Skeleton width={"75%"} borderRadius={5} height={50} />
            <Skeleton width={"23%"} borderRadius={5} height={50} />
          </XStack>
        </YStack>
      </YStack>
      <Skeleton borderRadius={5} height={40} />
    </YStack>
  );
}
