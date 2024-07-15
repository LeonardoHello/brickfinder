import { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import { router } from "../init";
import { applicationRouter } from "@/src/lib/trpc/router/application";
import { jobRouter } from "@/src/lib/trpc/router/job";
import { moderatorRouter } from "@/src/lib/trpc/router/moderator";
import { userRouter } from "@/src/lib/trpc/router/user";

export const appRouter = router({
  user: userRouter,
  moderator: moderatorRouter,
  job: jobRouter,
  application: applicationRouter,
});

export type TRPCRouter = typeof appRouter;

export type RouterOutputs = inferRouterOutputs<TRPCRouter>;
export type RouterInputs = inferRouterInputs<TRPCRouter>;
export type ReactQueryOptions = inferReactQueryProcedureOptions<TRPCRouter>;
