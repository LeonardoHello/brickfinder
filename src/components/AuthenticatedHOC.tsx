import type { FC } from "react";

import { Session } from "@supabase/supabase-js";

import { useSession } from "../context/session";

export default function AuthenticatedHOC(
  WrappedComponent: FC<{ session: Session }>,
) {
  return () => {
    const { session } = useSession();

    if (session === null) {
      throw new Error("Cannot access current screen without authentication.");
    }

    return <WrappedComponent session={session} />;
  };
}
