import { Text as NativeText } from "react-native";

import { cn } from "@/utils/cn";

export function Text({ className, ...rest }: NativeText["props"]) {
  return (
    <NativeText {...rest} className={cn("font-inter-regular", className)} />
  );
}
