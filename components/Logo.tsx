import { Link } from "expo-router";

import { BrickWall } from "@tamagui/lucide-icons";

export default function Logo({ isChecked }: { isChecked: boolean }) {
  if (isChecked) {
    return (
      <Link href={"/(app)/applicants"}>
        <BrickWall strokeWidth={1.4} />
      </Link>
    );
  }

  return (
    <Link href={"/(app)/jobs"}>
      <BrickWall strokeWidth={1.4} />
    </Link>
  );
}
