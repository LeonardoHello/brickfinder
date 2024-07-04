import { YStack, useTheme } from "tamagui";
import { XStack } from "tamagui";

import Skeleton from "@/components/Skeleton";

export default function FormSkeletonLoader() {
  const { background } = useTheme();

  const backgroundColor = background.get();

  return (
    <YStack
      flex={1}
      paddingHorizontal={"$4"}
      paddingVertical={"$6"}
      gap={"$7"}
      backgroundColor={"$background075"}
    >
      <YStack gap={"$3.5"}>
        <Skeleton
          backgroundColor={backgroundColor}
          borderRadius={2}
          height={15}
          width={175}
        />
        <Skeleton
          backgroundColor={backgroundColor}
          borderRadius={5}
          height={50}
        />
      </YStack>
      <YStack gap={"$3.5"}>
        <Skeleton
          backgroundColor={backgroundColor}
          borderRadius={2}
          height={15}
          width={150}
        />
        <Skeleton
          backgroundColor={backgroundColor}
          borderRadius={5}
          height={50}
        />
      </YStack>
      <YStack gap={"$3.5"}>
        <Skeleton
          backgroundColor={backgroundColor}
          borderRadius={2}
          height={15}
          width={225}
        />
        <Skeleton
          backgroundColor={backgroundColor}
          borderRadius={5}
          height={50}
        />
      </YStack>
      <YStack gap={"$3.5"}>
        <Skeleton
          backgroundColor={backgroundColor}
          borderRadius={2}
          height={15}
          width={200}
        />
        <YStack gap={"$2"}>
          <XStack gap={"$2"}>
            <Skeleton
              width={"75%"}
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={50}
            />
            <Skeleton
              width={"23%"}
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={50}
            />
          </XStack>
          <XStack gap={"$2"}>
            <Skeleton
              width={"75%"}
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={50}
            />
            <Skeleton
              width={"23%"}
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={50}
            />
          </XStack>
          <XStack gap={"$2"}>
            <Skeleton
              width={"75%"}
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={50}
            />
            <Skeleton
              width={"23%"}
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={50}
            />
          </XStack>
        </YStack>
      </YStack>
      <Skeleton
        backgroundColor={backgroundColor}
        borderRadius={5}
        height={40}
      />
    </YStack>
  );
}
