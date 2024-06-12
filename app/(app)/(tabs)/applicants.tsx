import { H1, YStack } from "tamagui";

import AuthenticatedHOC from "@/components/AuthenticatedHOC";

export default AuthenticatedHOC(function ApplicantsScreen() {
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
