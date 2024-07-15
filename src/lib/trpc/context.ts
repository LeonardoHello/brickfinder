import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { db } from "@/src/db";

export const createContext = (opts: FetchCreateContextFnOptions) => {
  return { db, req: opts.req };
};
