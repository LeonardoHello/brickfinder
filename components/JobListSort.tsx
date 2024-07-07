import { Link } from "expo-router";

import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpWideNarrow,
} from "@tamagui/lucide-icons";
import { Button, XGroup } from "tamagui";

export default function JobListSort({
  pathname,
  sortBy,
  direction = "asc",
}: {
  pathname: string;
  sortBy: "date" | "salary" | "expiration" | undefined;
  direction: "asc" | "desc" | undefined;
}) {
  const sortingOption = {
    asc: { nextDirection: "desc", icon: ArrowUpWideNarrow },
    desc: { nextDirection: "asc", icon: ArrowDownWideNarrow },
  }[direction];

  const defaultSortingOption = { nextDirection: "asc", icon: ArrowUpDown };

  return (
    <XGroup bordered borderColor={"$gray5"}>
      <XGroup.Item>
        <Link
          href={{
            pathname,
            params: {
              sortBy: "date",
              direction:
                sortBy === "date"
                  ? sortingOption.nextDirection
                  : defaultSortingOption.nextDirection,
            },
          }}
          asChild
        >
          <Button
            flex={1}
            icon={
              sortBy === "date" ? sortingOption.icon : defaultSortingOption.icon
            }
            size={"$3"}
            bw={0}
            backgroundColor={sortBy !== "date" ? "$gray2" : undefined}
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
              sortBy: "salary",
              direction:
                sortBy === "salary"
                  ? sortingOption.nextDirection
                  : defaultSortingOption.nextDirection,
            },
          }}
          asChild
        >
          <Button
            flex={1}
            icon={
              sortBy === "salary"
                ? sortingOption.icon
                : defaultSortingOption.icon
            }
            size={"$3"}
            bw={0}
            backgroundColor={sortBy !== "salary" ? "$gray2" : undefined}
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
              sortBy: "expiration",
              direction:
                sortBy === "expiration"
                  ? sortingOption.nextDirection
                  : defaultSortingOption.nextDirection,
            },
          }}
          asChild
        >
          <Button
            flex={1}
            icon={
              sortBy === "expiration"
                ? sortingOption.icon
                : defaultSortingOption.icon
            }
            size={"$3"}
            bw={0}
            backgroundColor={sortBy !== "expiration" ? "$gray2" : undefined}
          >
            expiration
          </Button>
        </Link>
      </XGroup.Item>
    </XGroup>
  );
}
