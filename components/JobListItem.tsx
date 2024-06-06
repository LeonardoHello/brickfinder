import { Link } from "expo-router";

import { ChevronRight, EyeOff } from "@tamagui/lucide-icons";
import { Avatar, H4, ListItem, SizableText, XStack } from "tamagui";

import { ArrElement } from "@/lib/types";
import type { RouterOutputs } from "@/trpc/routers";

export default function JobListItem({
  item,
  isSignedIn,
}: {
  item: ArrElement<RouterOutputs["job"]["getAll"]>;
  isSignedIn: boolean;
}) {
  const { id, position, company } = item;

  return (
    <Link
      href={{
        pathname: "/(app)/jobs/[id]",
        params: { id },
      }}
      asChild
    >
      <ListItem
        disabled={!isSignedIn}
        disabledStyle={{ opacity: 0.6 }}
        title={<H4>{position}</H4>}
        backgroundColor={"$background"}
        subTitle={
          isSignedIn ? (
            <SizableText
              size={"$3"}
              fontFamily={"$silkscreen"}
              color={"darkgray"}
            >
              {company.name}
            </SizableText>
          ) : (
            <XStack alignItems="center" gap={"$2"}>
              <SizableText
                size={"$3"}
                fontFamily={"$silkscreen"}
                color={"darkgray"}
              >
                hidden
              </SizableText>
              <EyeOff size={"$1"} color={"darkgray"} />
            </XStack>
          )
        }
        icon={
          <Avatar circular size="$4">
            {!isSignedIn && <EyeOff />}
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
              blurRadius={isSignedIn ? undefined : 15}
            />
            <Avatar.Fallback backgroundColor="$background" />
          </Avatar>
        }
        bordered
        iconAfter={isSignedIn ? <ChevronRight size={"$1.5"} /> : undefined}
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
