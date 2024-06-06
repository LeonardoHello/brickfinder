import { Spinner, YStack } from "tamagui";

export default function ScreenLoader() {
  return (
    <YStack
      flex={1}
      p={"$3"}
      backgroundColor={"$background075"}
      gap={"$3"}
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size="large" />
    </YStack>
  );
}
