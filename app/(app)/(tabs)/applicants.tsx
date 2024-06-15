import { Squirrel } from "@tamagui/lucide-icons";
import { H1, H4, YStack } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";

export default AuthenticatedHOC(function ApplicantsScreen() {
  if (true) {
    return (
      <YStack
        flex={1}
        backgroundColor={"$background075"}
        alignItems="center"
        justifyContent="center"
      >
        <YStack pressStyle={{ transform: "scaleX(-1)" }}>
          <Squirrel color={"$purple10"} size={"$20"} strokeWidth={1} />
        </YStack>
        <H4 color={"$purple10"} fontWeight={500}>
          No applicants yet.
        </H4>
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
