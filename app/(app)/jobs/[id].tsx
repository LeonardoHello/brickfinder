import { Stack, useLocalSearchParams } from "expo-router";

import { H1, YStack } from "tamagui";

export default function JobScreen() {
  const { id } = useLocalSearchParams();

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor={"$background075"}
    >
      <Stack.Screen options={{ title: id as string }} />
      <H1>We are very interesting</H1>
    </YStack>
  );
}
