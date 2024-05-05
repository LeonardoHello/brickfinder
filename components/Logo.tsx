import { Link } from "expo-router";

import { BrickWall } from "@tamagui/lucide-icons";

export default function Logo() {
  return (
    <Link href={"/(app)/(tabs)/"}>
      <BrickWall size={"$1"} strokeWidth={1} />
    </Link>
  );
}
