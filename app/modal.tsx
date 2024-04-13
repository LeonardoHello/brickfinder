import { Platform, View } from "react-native";

import { StatusBar } from "expo-status-bar";

import { Text } from "@/components/Text";

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-inter-bold text-xl">Modal</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
