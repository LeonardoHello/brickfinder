import { Platform, View } from "react-native";

import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Text } from "@/components/Text";

export default function ModalScreen() {
  const router = useRouter();

  const isPresented = router.canGoBack();
  return (
    <View className="flex-1 items-center justify-center bg-gray-950">
      <Text>Sign-in</Text>
      {!isPresented && <Link href="../">Dismiss</Link>}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
