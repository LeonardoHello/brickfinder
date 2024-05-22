import { FlashList } from "@shopify/flash-list";
import { SizableText, XStack } from "tamagui";

import { trpc } from "@/lib/utils/trpc";
import { RouterOutputs } from "@/trpc/routers";

export default function JobList({
  userId,
  jobs,
}: {
  userId: string;
  jobs: RouterOutputs["job"]["getAll"];
}) {
  const { data: user } = trpc.user.getById.useQuery(userId);

  return (
    <XStack>
      <FlashList
        data={jobs}
        estimatedItemSize={20}
        renderItem={({ item }) => <SizableText>{item.title}</SizableText>}
        keyExtractor={(item) => item.id}
      />
    </XStack>
  );
}
