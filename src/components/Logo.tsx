import { Link } from "expo-router";

import { BrickWall } from "@tamagui/lucide-icons";

export default function Logo({
  isSignedIn,
  isModerator,
}: {
  isSignedIn?: boolean;
  isModerator?: "true" | undefined;
}) {
  const pathname = isSignedIn ? "/jobs" : "/";

  return (
    <Link href={{ pathname, params: { isModerator } }}>
      <BrickWall strokeWidth={1.4} />
    </Link>
  );
}
