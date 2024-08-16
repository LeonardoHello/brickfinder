import { useState } from "react";

import { Adapt, Button, Dialog, ScrollView, Sheet, Spinner } from "tamagui";

import ApplicationForm from "./ApplicationForm";
import { Application } from "@/db/schema";
import { trpc } from "@/utils/trpc";

export default function ApplicationDialog({
  userId,
  jobId,
}: {
  userId: Application["userId"];
  jobId: Application["jobId"];
}) {
  const [open, setOpen] = useState(false);

  const { data: user, isLoading: isLoadingUser } =
    trpc.user.getApplicationById.useQuery(userId);
  const { data: application, isLoading: isLoadingApplication } =
    trpc.application.getById.useQuery({ userId, jobId });

  if (isLoadingUser || isLoadingApplication) {
    return (
      <Button
        theme={"blue"}
        size={"$4.5"}
        px={"$6"}
        alignSelf="flex-start"
        borderRadius="$10"
      >
        <Spinner />
      </Button>
    );
  }

  if (!user) {
    throw new Error(
      "There was a problem with fetching data for submiting application.",
    );
  }

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {application ? (
          <Button
            theme={"blue"}
            size={"$4.5"}
            px={"$6"}
            alignSelf="flex-start"
            borderRadius="$10"
          >
            Edit application
          </Button>
        ) : (
          <Button
            theme={"blue"}
            size={"$4.5"}
            px={"$6"}
            alignSelf="flex-start"
            borderRadius="$10"
          >
            Apply
          </Button>
        )}
      </Dialog.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4">
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
        >
          <ScrollView space="$4">
            <Dialog.Title>Contact infromation</Dialog.Title>
            <Dialog.Description>
              This form allows employers to review your details and potentially
              connect with you for further discussions.
            </Dialog.Description>

            <ApplicationForm
              userId={userId}
              jobId={jobId}
              defaultValues={application ? application : user}
              closeDialog={closeDialog}
            />
          </ScrollView>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
