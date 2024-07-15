import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createContext } from "@/src/lib/trpc/context";
import { appRouter } from "@/src/lib/trpc/router";

export async function handler(req: Request) {
  return fetchRequestHandler({
    req,
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error);
    },
  });
}

export { handler as GET, handler as POST };
