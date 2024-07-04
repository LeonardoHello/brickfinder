import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ToastViewport, ToastViewportProps } from "@tamagui/toast";

export default function SafeToastViewport(props: ToastViewportProps) {
  const { left, bottom, right } = useSafeAreaInsets();
  return (
    <ToastViewport
      flexDirection="column-reverse"
      bottom={bottom + 50}
      left={left}
      right={right}
      {...props}
    />
  );
}
