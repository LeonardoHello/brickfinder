import { FlatList, Text, View } from "react-native";

import { trpc } from "@/lib/utils/trpc";

export default function JobsScreen() {
  const posts = trpc.post.all.useQuery();

  return (
    <View>
      <Text>Jobs</Text>
      <FlatList
        data={posts.data}
        renderItem={({ item }) => <Text>{item.text}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
