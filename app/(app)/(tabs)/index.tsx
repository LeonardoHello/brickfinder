import { View } from "react-native";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Text } from "@/components/ui/text";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>
        <ThemeToggle />
      </Text>
    </View>
  );
}
