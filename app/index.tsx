import { View } from "react-native";

import { Link } from "expo-router";

import { Text } from "@/components/Text";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-950">
      <Link
        href="/(tabs)/settings"
        className="font-inter-extrabold text-7xl tracking-tighter text-gray-50"
      >
        Welcome
      </Link>
    </View>
  );
}
