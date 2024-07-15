import { useEffect } from "react";
import Animated, {
  StyleProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { useTheme } from "tamagui";

const duration = 1000;

export default function Skeleton({
  ...props
}: React.ComponentPropsWithoutRef<typeof Animated.View> & StyleProps) {
  const sv = useSharedValue(1);

  const { gray2 } = useTheme();
  const backgroundColor = gray2.get();

  useEffect(() => {
    sv.value = withRepeat(
      withSequence(withTiming(0.5, { duration }), withTiming(1, { duration })),
      -1,
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: sv.value,
    backgroundColor,
  }));

  return <Animated.View style={style} {...props} />;
}
