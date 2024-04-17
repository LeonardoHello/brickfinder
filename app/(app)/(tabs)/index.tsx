import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/hooks/useColorTheme";

export default function HomeScreen() {
  const { toggleColorScheme } = useColorScheme();

  return (
    <View className="flex-1 items-center justify-center">
      <Button
        onPress={() => {
          toggleColorScheme();
        }}
      >
        <Text className="text-xl">Home</Text>
      </Button>
    </View>
  );
}
