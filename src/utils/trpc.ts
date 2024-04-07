import { createTRPCReact } from "@trpc/react-query";

import { cn } from "./cn";
import { AppRouter } from "@/lib/trpc/routers";

export const trpc = createTRPCReact<AppRouter>();
