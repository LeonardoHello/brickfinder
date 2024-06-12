import { Spinner, YStack } from "tamagui";

export default function ScreenLoader() {
  return (
    <YStack
      flex={1}
      p={"$3"}
      gap={"$3"}
      alignItems="center"
      justifyContent="center"
      backgroundColor={"$background075"}
    >
      <Spinner size="large" />
    </YStack>
  );
}
