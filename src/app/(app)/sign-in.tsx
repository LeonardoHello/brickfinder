import { useEffect } from "react";

import * as WebBrowser from "expo-web-browser";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  H1,
  ListItem,
  Separator,
  SizableText,
  YGroup,
  YStack,
  useTheme,
} from "tamagui";

import { useSession } from "@/src/context/session";

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

  const { gray8 } = useTheme();
  const buttonColor = gray8.get();

  const { signIn } = useSession();

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
            onPress={() => {
              signIn("facebook");
            }}
          >
            <FontAwesome6 name="facebook" size={36} color={buttonColor} />
            <SizableText fontFamily={"$silkscreen"}>Facebook</SizableText>
          </ListItem>
        </YGroup.Item>

        <Separator />

        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            gap={"$4"}
            justifyContent="flex-start"
            onPress={() => {
              signIn("google");
            }}
          >
            <FontAwesome6 name="google" size={36} color={buttonColor} />
            <SizableText fontFamily={"$silkscreen"}>Google</SizableText>
          </ListItem>
        </YGroup.Item>

        <Separator />

        <YGroup.Item>
          <ListItem
            hoverTheme
            pressTheme
            gap={"$4"}
            justifyContent="flex-start"
            onPress={() => {
              signIn("linkedin");
            }}
          >
            <FontAwesome6 name="linkedin" size={36} color={buttonColor} />
            <SizableText fontFamily={"$silkscreen"}>Linkedin</SizableText>
          </ListItem>
        </YGroup.Item>
      </YGroup>
    </YStack>
  );
}
