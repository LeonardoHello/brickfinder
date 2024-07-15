import { Link } from "expo-router";

import {
  ArrowDownWideNarrow,
  ArrowUpDown,
  ArrowUpWideNarrow,
} from "@tamagui/lucide-icons";
import { Button, XGroup } from "tamagui";

export default function JobListSort({
  pathname,
  isModerator,
  sortBy = "date",
  direction = "asc",
}: {
  pathname: string;
  isModerator: "true" | undefined;
  sortBy: "date" | "salary" | "expiration" | undefined;
  direction: "asc" | "desc" | undefined;
}) {
  const sortingOption = {
    asc: { nextDirection: "desc", icon: ArrowUpWideNarrow },
    desc: { nextDirection: "asc", icon: ArrowDownWideNarrow },
  }[direction];

  const initialSortingOption = { nextDirection: "asc", icon: ArrowUpDown };

  return (
    <XGroup bordered borderColor={"$gray5"}>
      <XGroup.Item>
        <Link
          href={{
            pathname,
            params: {
              isModerator,
              sortBy: "date",
              direction:
                sortBy === "date"
                  ? sortingOption.nextDirection
                  : initialSortingOption.nextDirection,
            },
          }}
          asChild
        >
          <Button
            flex={1}
            icon={
              sortBy === "date" ? sortingOption.icon : initialSortingOption.icon
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
              isModerator,
              sortBy: "salary",
              direction:
                sortBy === "salary"
                  ? sortingOption.nextDirection
                  : initialSortingOption.nextDirection,
            },
          }}
          asChild
        >
          <Button
            flex={1}
            icon={
              sortBy === "salary"
                ? sortingOption.icon
                : initialSortingOption.icon
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
              isModerator,
              sortBy: "expiration",
              direction:
                sortBy === "expiration"
                  ? sortingOption.nextDirection
                  : initialSortingOption.nextDirection,
            },
          }}
          asChild
        >
          <Button
            flex={1}
            icon={
              sortBy === "expiration"
                ? sortingOption.icon
                : initialSortingOption.icon
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
