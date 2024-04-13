import { Text as TextNative } from "react-native";

import { cn } from "@/lib/utils/cn";

export function Text({ className, ...rest }: TextNative["props"]) {
  return (
    <TextNative
      {...rest}
      className={cn("font-inter-regular text-gray-50", className)}
    />
  );
}
