import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/hooks/useColorTheme";

export default function HomeScreen() {
  const { toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1 items-center justify-center">
      <Text
        className="text-xl"
        onPress={() => {
          toggleColorScheme();
        }}
      >
        Home
      </Text>
    </View>
  );
}
