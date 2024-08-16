import { UseFormSetValue } from "react-hook-form";

import * as DocumentPicker from "expo-document-picker";
import * as ExpoFileSystem from "expo-file-system";

import { useToastController } from "@tamagui/toast";
import { Button } from "tamagui";

import { FormSchema } from "./ApplicationForm";
import { User } from "@/db/schema";
import { trpc } from "@/utils/trpc";

export default function FileUploadButton({
  userId,
  disabled,
  setValue,
  isUploading,
  setIsUploading,
}: {
  userId: User["id"];
  disabled: boolean;
  setValue: UseFormSetValue<FormSchema>;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}) {
  const toast = useToastController();

  const createResume = trpc.resume.create.useMutation({
    onMutate: () => {
      setIsUploading(true);
    },
    onError: () => {
      toast.show("Something went wrong with the file selection!", {
        native: true,
      });
    },
    onSuccess: (data) => {
      const [resume] = data;

      setValue("resume.name", resume.name);
      setValue("resume.fullPath", resume.fullPath);
      setValue("resume.url", resume.publicUrl);
    },
    onSettled: () => {
      setIsUploading(false);
    },
  });

  return (
    <Button
      variant="outlined"
      disabled={disabled || isUploading}
      disabledStyle={{ opacity: 0.5 }}
      h={50}
      onPress={async () => {
        const result = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
        });

        if (result.canceled) {
          toast.show("Canceled", {
            native: true,
          });

          return;
        }

        const { name, uri, mimeType } = result.assets[0];

        const fileContent = await ExpoFileSystem.readAsStringAsync(uri, {
          encoding: ExpoFileSystem.EncodingType.Base64,
        });

        const base64 = `data:${mimeType};base64,${fileContent}`;

        createResume.mutate({ name, mimeType, base64, userId });
      }}
    >
      {isUploading ? "uploading..." : "upload"}
    </Button>
  );
}
