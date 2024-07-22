import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { db } from "@/db";

export const createContext = (opts: FetchCreateContextFnOptions) => {
	return { db, req: opts.req };
};
