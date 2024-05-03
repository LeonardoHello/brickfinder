import { Link } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";
import { Menu, User } from "@tamagui/lucide-icons";
import { Adapt, Button, Popover, Spinner } from "tamagui";

export default function MenuButton() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <Spinner padding={"$2"} mr={"$3"} />;
  }

  const button = (
    <Button mr={"$3"} aspectRatio={"1/1"} size={"$3"} chromeless>
      <Menu />
    </Button>
  );

  if (!isSignedIn) {
    return (
      <Popover size="$5" allowFlip>
        <Popover.Trigger asChild>{button}</Popover.Trigger>
        <Adapt when="sm" platform="touch">
          <Popover.Sheet modal dismissOnSnapToBottom>
            <Popover.Sheet.Frame padding="$4">
              <Adapt.Contents />
            </Popover.Sheet.Frame>

            <Popover.Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Popover.Sheet>
        </Adapt>
        <Popover.Content
          borderWidth={1}
          borderColor="$borderColor"
          enterStyle={{ y: -10, opacity: 0 }}
          exitStyle={{ y: -10, opacity: 0 }}
          elevate
          animation={[
            "quick",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
        >
          <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

          <Popover.Close>
            <Button
              size="$3"
              onPress={() => {
                /* Custom code goes here, does not interfere with popover closure */
              }}
            >
              Submit
            </Button>
          </Popover.Close>

          <Link href={"/(app)/(tabs)/settings"} asChild>
            <Button
              icon={User}
              justifyContent="flex-start"
              borderWidth={0}
              chromeless
            >
              Profile
            </Button>
          </Link>
        </Popover.Content>
      </Popover>
    );
  }
}
