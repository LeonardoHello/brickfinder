import { FlatList } from "react-native";

import { SizableText, YStack } from "tamagui";

import { trpc } from "@/lib/utils/trpc";

export default function JobsScreen() {
  const posts = trpc.post.all.useQuery();

  return (
    <YStack>
      <FlatList
        data={posts.data}
        renderItem={({ item }) => <SizableText>{item.text}</SizableText>}
        keyExtractor={(item) => item.id}
      />
    </YStack>
  );
}
