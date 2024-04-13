import { View } from "react-native";

import { Link } from "expo-router";

export default function TabOneScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-950">
      <Link href="/" className="font-inter-regular text-xl text-gray-50">
        Welcome
      </Link>
    </View>
  );
}
