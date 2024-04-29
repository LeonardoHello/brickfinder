import { useCallback } from "react";
import { View } from "react-native";

import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";

import { useOAuth } from "@clerk/clerk-expo";

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

  const router = useRouter();

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
      const { createdSessionId, setActive, signUp } = await selectedAuth();

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });

        if (signUp) {
          router.replace("/profile");
        }
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return <View></View>;
}
