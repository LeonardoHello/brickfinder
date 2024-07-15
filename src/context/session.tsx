import { createContext, useContext, useEffect, useState } from "react";

import * as Linking from "expo-linking";

import { Provider, Session } from "@supabase/supabase-js";

import { supabase } from "@/src/utils/supabase";

const AuthContext = createContext<{
  signIn: (provider: Provider) => Promise<void>;
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

  const signIn = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: Linking.createURL("/sign-in", { scheme: "myapp" }),
      },
    });
    if (error) {
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  };

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
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
