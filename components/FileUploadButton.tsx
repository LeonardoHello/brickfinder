import { useState } from "react";

import { useToastController } from "@tamagui/toast";
import { Button, Progress } from "tamagui";
import { UploadedFileData } from "uploadthing/types";

import { useDocumentUploader } from "@/utils/uploadthing";

type Resume = Pick<UploadedFileData, "key" | "name" | "url">;

export default function FileUploadButton({
  setResume,
  setIsUploading,
  disabled,
}: {
  setResume: (value: Resume) => void;
  setIsUploading: (value: boolean) => void;
  disabled: boolean;
}) {
  const toast = useToastController();

  const [progress, setProgress] = useState(0);

  const { openDocumentPicker, isUploading } = useDocumentUploader("document", {
    onBeforeUploadBegin: (files) => {
      setIsUploading(true);
      return files;
    },
    onUploadProgress: (p) => {
      setProgress(p);
    },
    onClientUploadComplete: (res) => {
      const file = res[0];
      setResume(file);
      setIsUploading(false);
    },
    onUploadError: (error) => {
      toast.show("Upload Error", {
        native: true,
      });
      setIsUploading(false);
    },
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
      h={50}
      onPress={() => {
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
