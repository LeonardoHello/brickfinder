import { createTRPCReact } from "@trpc/react-query";

import { TRPCRouter } from "@/src/lib/trpc/router";

export const trpc = createTRPCReact<TRPCRouter>();
