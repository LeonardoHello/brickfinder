import { useState } from "react";
import { View } from "react-native";

import { Text } from "@/components/InterText";
import { trpc } from "@/utils/trpc";

export default function TabOneScreen() {
  const { data } = trpc.post.all.useQuery();
  const [display, setDisplay] = useState(false);

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-inter-bold text-xl">Tab One</Text>
      <Text
        onPress={() => {
          setDisplay((prev) => !prev);
        }}
      >
        Yolox
      </Text>
      {display && <Text>{JSON.stringify(data, null, 2)}</Text>}
    </View>
  );
}
