import { FlatList } from "react-native";

import { Link } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";
import { ChevronRight } from "@tamagui/lucide-icons";
import { Avatar, H4, ListItem, SizableText, Spinner, YStack } from "tamagui";

import { ArrElement } from "@/lib/types";
import type { RouterOutputs } from "@/trpc/routers";

export default function JobList({
  jobs,
}: {
  jobs: RouterOutputs["job"]["getAll"];
}) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Spinner />;
  }

  return (
    <YStack f={1}>
      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <JobListItem item={item} isSignedIn={isSignedIn} />
        )}
        keyExtractor={(item) => item.id}
      />
    </YStack>
  );
}

function JobListItem({
  item,
  isSignedIn,
}: {
  item: ArrElement<RouterOutputs["job"]["getAll"]>;
  isSignedIn: boolean;
}) {
  return (
    <Link
      href={{
        pathname: "/(app)/jobs/[id]",
        params: { id: item.id },
      }}
      asChild
    >
      <ListItem
        disabled={!isSignedIn}
        disabledStyle={{ opacity: 0.6 }}
        title={<H4 lineHeight={"$6"}>{item.position}</H4>}
        subTitle={
          isSignedIn ? (
            <SizableText
              size={"$3"}
              fontFamily={"$silkscreen"}
              color={"darkgray"}
            >
              {item.company.name}
            </SizableText>
          ) : (
            <SizableText
              size={"$3"}
              fontFamily={"$silkscreen"}
              color={"transparent"}
              textShadowColor="darkgray"
              textShadowOffset={{
                width: 0,
                height: 0,
              }}
              textShadowRadius={5}
            >
              hidden
            </SizableText>
          )
        }
        icon={
          <Avatar circular size="$4">
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              blurRadius={isSignedIn ? undefined : 20}
            />
            <Avatar.Fallback backgroundColor="$gray10" />
          </Avatar>
        }
        bordered
        iconAfter={<ChevronRight size={"$1"} />}
        borderRadius={"$4"}
        animation={"100ms"}
        hoverStyle={{ scale: 0.98 }}
        pressStyle={{ scale: 0.98 }}
        color={"$white025"}
      >
        {item.location}
      </ListItem>
    </Link>
  );
}
