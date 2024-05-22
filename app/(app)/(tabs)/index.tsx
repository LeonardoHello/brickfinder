import { Link, usePathname } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";
import { Button, XStack, YStack } from "tamagui";

import JobList from "@/components/JobList";
import { trpc } from "@/lib/utils/trpc";

export default function JobsScreen() {
  const { userId } = useAuth();

  const { data: jobs } = trpc.job.getAll.useQuery();

  if (!jobs) {
    return null;
  }

  const pathname = "/(app)/";

  return (
    <YStack
      flex={1}
      p={"$3"}
      alignItems={"center"}
      backgroundColor={"$background075"}
    >
      <XStack gap={"$2"} flexWrap="wrap">
        <Link href={{ pathname, params: { sort: "date" } }} asChild>
          <Button>sort by date</Button>
        </Link>
        <Link href={{ pathname, params: { sort: "exp" } }} asChild>
          <Button>sort by experience</Button>
        </Link>
        <Link href={{ pathname, params: { sort: "salary" } }} asChild>
          <Button>sort by salary</Button>
        </Link>
        <Link href={{ pathname, params: { sort: "company" } }} asChild>
          <Button>sort by experience</Button>
        </Link>
      </XStack>
      {userId && <JobList userId={userId} jobs={jobs} />}
    </YStack>
  );
}
