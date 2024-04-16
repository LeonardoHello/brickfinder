import { Pressable, View } from "react-native";

import { Link } from "expo-router";

import { Text } from "@/components/ui/text";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Link href="/(app)/(tabs)" replace asChild>
        <Pressable>
          <Text className="text-center font-inter-black text-7xl">
            Welcome Nigguh
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
