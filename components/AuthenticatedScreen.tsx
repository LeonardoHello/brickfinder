import React, { FC } from "react";

import { useAuth } from "@clerk/clerk-expo";

import ScreenLoader from "./ScreenLoader";
import { User } from "@/lib/db/schema";

export default function AuthenticatedScreen(
  WrappedComponent: FC<{ userId: User["id"] }>,
) {
  return () => {
    const { userId, isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) {
      return <ScreenLoader />;
    }

    if (!isSignedIn) {
      throw new Error("Cannot access current screen without authentication.");
    }

    return <WrappedComponent userId={userId} />;
  };
}
