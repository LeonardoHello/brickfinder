import { Link } from "expo-router";

import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "@tamagui/lucide-icons";
import { Button, XGroup } from "tamagui";

import { SearchParam } from "@/lib/types";

const pathname = "/(app)/";

export default function JobListSort({
  sort,
  direction,
}: {
  sort: SearchParam;
  direction: SearchParam;
}) {
  let dir;
  let dirIcon;
  switch (direction) {
    case "asc":
      dir = "desc";
      dirIcon = ArrowUpWideNarrow;
      break;

    case "desc":
      dir = "asc";
      dirIcon = ArrowDownWideNarrow;
      break;

    default:
      dir = "desc";
      break;
  }

  return (
    <XGroup bordered backgroundColor={"$background"}>
      <XGroup.Item>
        <Link
          href={{
            pathname,
            params: {
              sort: "date",
              direction: sort !== "date" ? "asc" : dir,
            },
          }}
          asChild
        >
          <Button
            flex={1}
            icon={sort === "date" ? dirIcon : ArrowUpWideNarrow}
            size={"$3"}
            bw={0}
            backgroundColor={sort !== "date" ? "$gray2" : undefined}
          >
            date
          </Button>
        </Link>
      </XGroup.Item>

      <XGroup.Item>
        <Link
          href={{
            pathname,
            params: {
              sort: "salary",
              direction: sort !== "salary" ? "asc" : dir,
            },
          }}
          asChild
        >
          <Button
            flex={1}
            icon={sort === "salary" ? dirIcon : ArrowUpWideNarrow}
            size={"$3"}
            bw={0}
            backgroundColor={sort !== "salary" ? "$gray2" : undefined}
          >
            salary
          </Button>
        </Link>
      </XGroup.Item>

      <XGroup.Item>
        <Link
          href={{
            pathname,
            params: {
              sort: "expiration",
              direction: sort !== "expiration" ? "asc" : dir,
            },
          }}
          asChild
        >
          <Button
            flex={1}
            icon={sort === "expiration" ? dirIcon : ArrowUpWideNarrow}
            size={"$3"}
            bw={0}
            backgroundColor={sort !== "expiration" ? "$gray2" : undefined}
          >
            expiration
          </Button>
        </Link>
      </XGroup.Item>
    </XGroup>
  );
}
