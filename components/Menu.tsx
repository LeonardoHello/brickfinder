import { useEffect, useState } from "react";
import { Platform } from "react-native";

import * as NavigationBar from "expo-navigation-bar";
import { Link } from "expo-router";
import * as SystemUI from "expo-system-ui";

import { useAuth } from "@clerk/clerk-expo";
import {
  Menu as MenuIcon,
  Moon,
  Settings,
  Sun,
  UserCog,
} from "@tamagui/lucide-icons";
import { Button, Sheet, Spinner, YStack } from "tamagui";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const { isLoaded, isSignedIn, signOut } = useAuth();

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
            )}
            {isSignedIn && (
              <>
                <Button
                  scaleIcon={1.5}
                  gap={"$1.5"}
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
                <Link href={"/(app)/profile"} asChild>
                  <Button
                    iconAfter={UserCog}
                    scaleIcon={1.5}
                    gap={"$1.5"}
                    justifyContent="flex-start"
                    borderWidth={0}
                    fontFamily={"$silkscreen"}
                    chromeless
                    onPress={closeModal}
                  >
                    profile
                  </Button>
                </Link>
              </>
            )}
            <Link href={"/(app)/(tabs)/settings"} asChild>
              <Button
                iconAfter={Settings}
                scaleIcon={1.5}
                gap={"$1.5"}
                justifyContent="flex-start"
                borderWidth={0}
                fontFamily={"$silkscreen"}
                chromeless
                onPress={closeModal}
              >
                settings
              </Button>
            </Link>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
