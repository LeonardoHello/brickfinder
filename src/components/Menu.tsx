import { useState } from "react";

import { Link } from "expo-router";

import { BadgeInfo, Menu as MenuIcon, Settings } from "@tamagui/lucide-icons";
import { Button, Separator, Sheet, XStack, YStack } from "tamagui";

import { useSession } from "../context/session";

export default function Menu({ isSignedIn }: { isSignedIn?: boolean }) {
  const [open, setOpen] = useState(false);

  const { signOut } = useSession();

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <XStack>
      <Button
        icon={MenuIcon}
        height={"$3.5"}
        borderWidth={"$1"}
        borderRadius={100_000}
        chromeless
        onPress={openModal}
      />
      <Sheet
        forceRemoveScrollEnabled={open}
        modal
        open={open}
        onOpenChange={setOpen}
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="medium"
        unmountChildrenWhenHidden
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Sheet.Handle />
        <Sheet.Frame padding="$4">
          <YStack gap={"$2"}>
            {!isSignedIn && (
              <>
                <Link href={"/sign-in"} asChild>
                  <Button
                    justifyContent="flex-start"
                    borderWidth={0}
                    fontFamily={"$silkscreen"}
                    chromeless
                    onPress={closeModal}
                  >
                    sign in
                  </Button>
                </Link>
                <Separator />
              </>
            )}

            <Link href={"/about-us"} asChild>
              <Button
                iconAfter={BadgeInfo}
                scaleIcon={1.5}
                justifyContent="flex-start"
                borderWidth={0}
                fontFamily={"$silkscreen"}
                chromeless
                onPress={closeModal}
              >
                about us
              </Button>
            </Link>
            <Link href={"/settings"} asChild>
              <Button
                iconAfter={Settings}
                scaleIcon={1.5}
                justifyContent="flex-start"
                borderWidth={0}
                fontFamily={"$silkscreen"}
                chromeless
                onPress={closeModal}
              >
                settings
              </Button>
            </Link>

            {isSignedIn && (
              <>
                <Separator />
                <Button
                  scaleIcon={1.5}
                  justifyContent="flex-start"
                  borderWidth={0}
                  fontFamily={"$silkscreen"}
                  chromeless
                  onPress={() => {
                    signOut();
                    closeModal();
                  }}
                >
                  log out
                </Button>
              </>
            )}
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </XStack>
  );
}
