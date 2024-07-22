import { useEffect } from "react";

import * as WebBrowser from "expo-web-browser";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { H1, ListItem, SizableText, YGroup, YStack, useTheme } from "tamagui";

import { useSession } from "@/context/session";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function ModalScreen() {
  useWarmUpBrowser();

  const { signIn } = useSession();

  const { gray8 } = useTheme();
  const buttonColor = gray8.get();

  return (
    <YStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor={"$background075"}
      gap="$4"
    >
      <H1>Sign in with</H1>
      <YGroup alignSelf="center" bordered width={255}>
        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            gap={"$4"}
            justifyContent="flex-start"
            onPress={signIn}
          >
            <FontAwesome6 name="google" size={36} color={buttonColor} />
            <SizableText fontFamily={"$silkscreen"}>Google</SizableText>
          </ListItem>
        </YGroup.Item>

        {/* <Separator /> */}
      </YGroup>
    </YStack>
  );
}
