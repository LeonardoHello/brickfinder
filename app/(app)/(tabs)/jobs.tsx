import { FlatList, View } from "react-native";

import { Text } from "@/components/ui/text";
import { trpc } from "@/lib/utils/trpc";

export default function JobsScreen() {
  const posts = trpc.post.all.useQuery();

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">Jobs</Text>
      <FlatList
        data={posts.data}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
