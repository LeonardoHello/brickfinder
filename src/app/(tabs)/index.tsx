import { useState } from "react";
import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { trpc } from "@/utils/trpc";

export default function TabOneScreen() {
  const { data } = trpc.post.all.useQuery();
  const [display, setDisplay] = useState(false);

  return (
    <View className="flex-1 items-center justify-center">
      <Text style={styles.title}>Tab One</Text>
      <Text
        onPress={() => {
          setDisplay((prev) => !prev);
        }}
      >
        Yolo
      </Text>
      {display && <Text>{JSON.stringify(data, null, 2)}</Text>}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
