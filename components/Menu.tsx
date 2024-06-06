import { useState } from "react";

import { Link } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";
import {
  BadgeInfo,
  Building,
  ClipboardList,
  Menu as MenuIcon,
  Settings,
} from "@tamagui/lucide-icons";
import { Button, Separator, Sheet, Spinner, YStack } from "tamagui";

import { User } from "@/lib/db/schema";
import { trpc } from "@/lib/utils/trpc";

export default function Menu() {
  const { userId, isSignedIn, isLoaded, signOut } = useAuth();

  const [open, setOpen] = useState(false);

  if (!isLoaded) {
    return (
      <Button
        icon={Spinner}
        height={"$3.5"}
        borderWidth={"$1"}
        borderRadius={100_000}
        chromeless
      />
    );
  }

  const openModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
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
                <Link href={"/(app)/sign-in"} asChild>
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

            {isSignedIn && (
              <CompanyOwnerButtons userId={userId} closeModal={closeModal} />
            )}

            <Link href={"/(app)/about-us"} asChild>
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
            <Link href={"/(app)/settings"} asChild>
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
    </>
  );
}

function CompanyOwnerButtons({
  userId,
  closeModal,
}: {
  userId: User["id"];
  closeModal: () => void;
}) {
  const { data: moderator } = trpc.moderator.getById.useQuery(userId, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (!moderator) {
    return null;
  }

  return (
    <>
      <Link href={"/(app)/company"} asChild>
        <Button
          iconAfter={Building}
          scaleIcon={1.5}
          justifyContent="flex-start"
          borderWidth={0}
          fontFamily={"$silkscreen"}
          chromeless
          onPress={closeModal}
        >
          company
        </Button>
      </Link>
      <Link href={"/(app)/applicants"} asChild>
        <Button
          iconAfter={ClipboardList}
          scaleIcon={1.5}
          justifyContent="flex-start"
          borderWidth={0}
          fontFamily={"$silkscreen"}
          chromeless
          onPress={closeModal}
        >
          applicants
        </Button>
      </Link>
      <Separator />
    </>
  );
}
