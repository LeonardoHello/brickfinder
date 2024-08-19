import { useRouter } from "expo-router";

import { Building, User as UserIcon } from "@tamagui/lucide-icons";
import { Spinner } from "tamagui";

import { Switch } from "@/components/Switch";
import { User } from "@/db/schema";
import { trpc } from "@/utils/trpc";

export default function RoleSwitch({
  userId,
  isModerator,
}: {
  userId: User["id"];
  isModerator: boolean;
}) {
  const router = useRouter();

  const { data: moderator, isLoading } =
    trpc.moderator.getExistanceById.useQuery(userId);

  if (isLoading) {
    return <Spinner mr="$3" />;
  }

  if (!moderator) {
    return null;
  }

  return (
    <Switch
      size={"$3"}
      checked={isModerator}
      onCheckedChange={(checked) => {
        if (checked) {
          router.setParams({ isModerator: "true" });
        } else {
          router.setParams({ isModerator: undefined });
        }
      }}
    >
      <Switch.Icon placement="left">
        <Building color="#fff" />
      </Switch.Icon>
      <Switch.Icon placement="right">
        <UserIcon color="#fff" />
      </Switch.Icon>
      <Switch.Thumb />
    </Switch>
  );
}
