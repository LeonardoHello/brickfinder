import { useState } from "react";
import { Alert } from "react-native";

import { openSettings } from "expo-linking";

import { useToastController } from "@tamagui/toast";
import { Button, Progress, SizableText, Spinner } from "tamagui";

import { useDocumentUploader } from "@/utils/uploadthing";

export default function FileUploadButton({
  onchange,
  disabled,
}: {
  onchange: (...event: any[]) => void;
  disabled: boolean | undefined;
}) {
  const toast = useToastController();

  const [progress, setProgress] = useState(0);

  const { openDocumentPicker, isUploading } = useDocumentUploader("document", {
    /**
     * Any props here are forwarded to the underlying `useUploadThing` hook.
     * Refer to the React API reference for more info.
     */
    onUploadProgress: (p) => {
      setProgress(p);
    },
    onClientUploadComplete: (res) => {
      onchange(res[0].name);
    },
    onUploadError: (error) => Alert.alert("Upload Error", error.message),
  });

  if (isUploading) {
    return (
      <Progress value={progress} h={25} size={4}>
        <Progress.Indicator animation="bouncy" />
      </Progress>
    );
  }

  return (
    <Button
      variant="outlined"
      disabled={disabled}
      disabledStyle={{ opacity: 0.5 }}
      f={1}
      h={50}
      onPress={async () => {
        openDocumentPicker({
          // onInsufficientPermissions: () => {
          //   Alert.alert(
          //     "No Permissions",
          //     "You need to grant permission to your Photos to use this",
          //     [
          //       { text: "Dismiss" },
          //       { text: "Open Settings", onPress: openSettings },
          //     ],
          //   );
          // },
        });
      }}
    >
      upload
    </Button>
  );
}
