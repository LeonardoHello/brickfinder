import { View } from "react-native";

import { useAuth } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { userId } = useAuth();

  if (!userId) {
    throw new Error("Cannot access profile page without authentication.");
  }

  return <View></View>;
}
