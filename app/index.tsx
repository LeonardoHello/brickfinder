import { Pressable, View } from "react-native";

import { Link } from "expo-router";

import { Text } from "@/components/Text";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-950">
      <Link href="/(app)/(tabs)" replace asChild>
        <Pressable>
          <Text className="text-center font-inter-black text-7xl">
            Welcome nigguh
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
