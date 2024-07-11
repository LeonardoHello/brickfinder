import { YStack } from "tamagui";

import Skeleton from "@/components/Skeleton";

export default function JobListSkeletonLoader() {
  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"} gap={"$3"}>
      <Skeleton borderRadius={4} height={35} />
      <YStack gap={"$2"}>
        <Skeleton borderRadius={5} height={130} />
        <Skeleton borderRadius={5} height={130} />
        <Skeleton borderRadius={5} height={130} />
        <Skeleton borderRadius={5} height={130} />
      </YStack>
    </YStack>
  );
}
