import { createTRPCReact } from "@trpc/react-query";

import { TRPCRouter } from "@/lib/trpc/router";

export const trpc = createTRPCReact<TRPCRouter>();
