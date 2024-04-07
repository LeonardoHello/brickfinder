import { ExpoRequest } from "expo-router/server";

import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createContext } from "@/lib/trpc/context";
import { appRouter } from "@/lib/trpc/routers";

export async function handler(req: ExpoRequest) {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req: req as unknown as Request,
    router: appRouter,
    createContext: () => createContext({ req }),
  });
}

export { handler as GET, handler as POST };
