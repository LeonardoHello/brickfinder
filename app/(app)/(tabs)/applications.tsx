import { Bird } from "@tamagui/lucide-icons";
import { H1, SizableText, YStack } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";

export default AuthenticatedHOC(function ApplicationsScreen() {
  if (true) {
    return (
      <YStack
        flex={1}
        backgroundColor={"$background075"}
        alignItems="center"
        justifyContent="center"
      >
        <YStack pressStyle={{ transform: "scaleX(-1)" }}>
          <Bird color={"$blue9"} size={"$20"} strokeWidth={1} />
        </YStack>
        <SizableText
          color={"$blue9"}
          size={"$8"}
          style={{ fontFamily: "InterLight" }}
        >
          No applications sent yet.
        </SizableText>
      </YStack>
    );
  }

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor={"$background075"}
    >
      <H1>pls</H1>
    </YStack>
  );
});
