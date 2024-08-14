import { createContext, useContext, useEffect, useState } from "react";

import * as SplashScreen from "expo-splash-screen";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { Session } from "@supabase/supabase-js";

import { supabase } from "@/utils/supabase";

const AuthContext = createContext<{
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  session: Session | null;
}>({
  signIn: async () => {},
  signOut: async () => {},
  session: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  if (!process.env.EXPO_PUBLIC_WEB_CLIENT_ID) {
    throw new Error(
      "Missing EXPO_PUBLIC_WEB_CLIENT_ID. Please set it in your .env",
    );
  }

  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.idToken) {
        await supabase.auth.signInWithIdToken({
          provider: "google",
          token: userInfo.idToken,
        });
      } else {
        throw new Error("no ID token present!");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      if (event === "INITIAL_SESSION") {
        SplashScreen.hideAsync();
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        session,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
