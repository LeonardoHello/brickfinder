import { useCallback } from "react";

import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { useOAuth } from "@clerk/clerk-expo";
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

import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

enum Strategy {
  Google = "oauth_google",
  Microsoft = "oauth_microsoft",
  Facebook = "oauth_facebook",
  Linkedin = "oauth_linkedin",
}

WebBrowser.maybeCompleteAuthSession();

export default function ModalScreen() {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { gray8 } = useTheme();
  const color = gray8.get();

  const { startOAuthFlow: googleOAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: microsoftOAuth } = useOAuth({
    strategy: "oauth_microsoft",
  });
  const { startOAuthFlow: facebookOAuth } = useOAuth({
    strategy: "oauth_facebook",
  });
  const { startOAuthFlow: linkedinOAuth } = useOAuth({
    strategy: "oauth_linkedin",
  });

  const onSelectAuth = useCallback(async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleOAuth,
      [Strategy.Microsoft]: microsoftOAuth,
      [Strategy.Facebook]: facebookOAuth,
      [Strategy.Linkedin]: linkedinOAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth({
        redirectUrl: Linking.createURL("/sign-in", { scheme: "myapp" }),
      });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

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
              onSelectAuth(Strategy.Facebook);
            }}
          >
            <FontAwesome6 name="facebook" size={36} color={color} />
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
              onSelectAuth(Strategy.Google);
            }}
          >
            <FontAwesome6 name="google" size={36} color={color} />
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
              onSelectAuth(Strategy.Microsoft);
            }}
          >
            <FontAwesome6 name="microsoft" size={36} color={color} />
            <SizableText fontFamily={"$silkscreen"}>Microsoft</SizableText>
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
              onSelectAuth(Strategy.Linkedin);
            }}
          >
            <FontAwesome6 name="linkedin" size={36} color={color} />
            <SizableText fontFamily={"$silkscreen"}>Linkedin</SizableText>
          </ListItem>
        </YGroup.Item>
      </YGroup>
    </YStack>
  );
}
