import { ExpoRequest } from "expo-router/server";

import type { inferAsyncReturnType } from "@trpc/server";

import db from "@/lib/db";

export const createContextInner = () => {
  return { db };
};

export const createContext = (opts: { req: ExpoRequest }) => {
  const contextInner = createContextInner();

  return { ...contextInner, req: opts.req };
};

export type Context = inferAsyncReturnType<typeof createContext>;
