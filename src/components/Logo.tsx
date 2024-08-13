import { Href, Link } from "expo-router";

import { BrickWall } from "@tamagui/lucide-icons";

export default function Logo({ href }: { href: Href }) {
  return (
    <Link href={href}>
      <BrickWall strokeWidth={1.4} />
    </Link>
  );
}
