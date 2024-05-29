import { Link, useLocalSearchParams } from "expo-router";

import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "@tamagui/lucide-icons";
import { Button, XGroup, YStack } from "tamagui";

import JobList from "@/components/JobList";
import type { SearchParam } from "@/lib/types";
import { trpc } from "@/lib/utils/trpc";

const pathname = "/(app)/";

export default function JobsScreen() {
  const searchParams = useLocalSearchParams();

  const { data: jobs, isLoading, error } = trpc.job.getAll.useQuery();

  if (isLoading) {
    return null;
  }

  if (!jobs || error) {
    throw new Error(error.message);
  }

  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"} gap={"$3"}>
      <JobListSort
        sort={searchParams.sort}
        direction={searchParams.direction}
      />
      {/* <JobListFilter filter={searchParams.filter} /> */}

      <JobList jobs={jobs} />
    </YStack>
  );
}

function JobListSort({
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
    <XGroup justifyContent="center">
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
            icon={sort === "date" ? dirIcon : ArrowUpWideNarrow}
            size={"$3"}
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
            icon={sort === "salary" ? dirIcon : ArrowUpWideNarrow}
            size={"$3"}
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
            icon={sort === "expiration" ? dirIcon : ArrowUpWideNarrow}
            size={"$3"}
            backgroundColor={sort !== "expiration" ? "$gray2" : undefined}
          >
            expiration
          </Button>
        </Link>
      </XGroup.Item>
    </XGroup>
  );
}

function JobListFilter({ filter }: { filter: SearchParam }) {
  return (
    <XGroup>
      <XGroup.Item>
        <Link
          href={{
            pathname,
            params: {
              filter: "date",
            },
          }}
          asChild
        >
          <Button size={"$3"} backgroundColor={"$background"}>
            filter
          </Button>
        </Link>
      </XGroup.Item>
    </XGroup>
  );
}
