import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { UTApi } from "uploadthing/server";

import db from "@/db";

export const createContext = (opts: FetchCreateContextFnOptions) => {
  return { db, utapi: new UTApi(), req: opts.req };
};
