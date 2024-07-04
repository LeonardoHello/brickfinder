import { Rat } from "@tamagui/lucide-icons";
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
        gap={"$4"}
        pressStyle={{ transform: "scaleX(-1)" }}
      >
        <Rat color={"$gray6"} size={"$20"} strokeWidth={1} />
        <SizableText
          color={"$gray6"}
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
