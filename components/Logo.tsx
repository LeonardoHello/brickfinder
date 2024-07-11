import { Link } from "expo-router";

import { BrickWall } from "@tamagui/lucide-icons";

export default function Logo({
  isSignedIn,
  isChecked,
}: {
  isSignedIn?: boolean;
  isChecked?: boolean;
}) {
  const pathname = !isSignedIn
    ? "/(app)/"
    : isChecked
      ? "/(app)/applicants"
      : "/(app)/jobs";

  return (
    <Link href={{ pathname }}>
      <BrickWall strokeWidth={1.4} />
    </Link>
  );
}
