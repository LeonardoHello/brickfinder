import type { inferReactQueryProcedureOptions } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { router } from "../";
import { companyRouter } from "./company";
import { jobRouter } from "./jobs";
import { moderatorRouter } from "./moderator";
import { userRouter } from "./user";

export const appRouter = router({
  user: userRouter,
  moderator: moderatorRouter,
  company: companyRouter,
  job: jobRouter,
});

export type AppRouter = typeof appRouter;

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
