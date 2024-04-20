import { useCallback } from "react";
import { View } from "react-native";

import * as WebBrowser from "expo-web-browser";

import { useOAuth } from "@clerk/clerk-expo";

import { ExternalLink } from "@/components/ExternalLink";
import { FontAwesome6 } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useWarmUpBrowser } from "@/lib/hooks/useWarmUpBrowser";

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

  const redirectUrl = "myapp://sign-in";
  const { startOAuthFlow: googleOAuth } = useOAuth({
    strategy: "oauth_google",
    redirectUrl,
  });
  const { startOAuthFlow: microsoftOAuth } = useOAuth({
    strategy: "oauth_microsoft",
    redirectUrl,
  });
  const { startOAuthFlow: facebookOAuth } = useOAuth({
    strategy: "oauth_facebook",
    redirectUrl,
  });
  const { startOAuthFlow: linkedinOAuth } = useOAuth({
    strategy: "oauth_linkedin",
    redirectUrl,
  });

  const onSelectAuth = useCallback(async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleOAuth,
      [Strategy.Microsoft]: microsoftOAuth,
      [Strategy.Facebook]: facebookOAuth,
      [Strategy.Linkedin]: linkedinOAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in with</CardTitle>
        </CardHeader>

        <CardContent className="gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-row gap-4 px-6"
            onPress={() => {
              onSelectAuth(Strategy.Google);
            }}
          >
            <FontAwesome6 name="google" className="text-3xl text-foreground" />
            <Text>Google</Text>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-row gap-4 px-6"
            onPress={() => {
              onSelectAuth(Strategy.Microsoft);
            }}
          >
            <FontAwesome6
              name="microsoft"
              className="text-3xl text-foreground"
            />
            <Text>Microsoft</Text>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-row gap-4 px-6"
            onPress={() => {
              onSelectAuth(Strategy.Facebook);
            }}
          >
            <FontAwesome6
              name="facebook"
              className="text-3xl text-foreground"
            />
            <Text>Facebook</Text>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-row gap-4"
            onPress={() => {
              onSelectAuth(Strategy.Linkedin);
            }}
          >
            <FontAwesome6
              name="linkedin"
              className="text-3xl text-foreground"
            />
            <Text>Linkedin</Text>
          </Button>
        </CardContent>
        <CardFooter>
          <Text className="text-sm text-muted-foreground">
            By signing in, you agree to Clerk's{" "}
            <ExternalLink
              href="https://clerk.com/legal/terms"
              className="font-inter-medium text-destructive-foreground"
            >
              Terms of Service
            </ExternalLink>{" "}
            and{" "}
            <ExternalLink
              href="https://clerk.com/legal/privacy"
              className="font-inter-medium text-destructive-foreground"
            >
              Privacy Policy
            </ExternalLink>
            .
          </Text>
        </CardFooter>
      </Card>
    </View>
  );
}
