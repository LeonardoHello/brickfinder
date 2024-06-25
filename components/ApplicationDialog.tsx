import { X } from "@tamagui/lucide-icons";
import { ToastViewport } from "@tamagui/toast";
import { Adapt, Button, Dialog, Sheet, Unspaced } from "tamagui";

import ApplicationForm from "./ApplicationForm";
import type { User } from "@/db/schema";
import { RouterOutputs } from "@/lib/trpc/router";
import { trpc } from "@/utils/trpc";

export default function ApplicationDialog({
  children,
  userId,
  job,
}: {
  children: React.ReactNode;
  userId: User["id"];
  job: NonNullable<RouterOutputs["job"]["getById"]>;
}) {
  const { data: user, isLoading } = trpc.user.getById.useQuery(userId);

  if (isLoading) {
    return children;
  }

  if (!user) {
    throw new Error("There was a problem with fetching user data.");
  }

  return (
    <Dialog modal>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap={"$4"}>
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={["transform", "opacity"]}
          animation={[
            "quicker",
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap={"$4"}
        >
          <Dialog.Title>Contact information</Dialog.Title>

          <ApplicationForm currentUser={user} jobId={job.id} />

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                icon={X}
              />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
