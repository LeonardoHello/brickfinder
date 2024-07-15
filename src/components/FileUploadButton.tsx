import { useState } from "react";

import * as DocumentPicker from "expo-document-picker";

import { useToastController } from "@tamagui/toast";
import { Button, Progress } from "tamagui";

import { supabase } from "../utils/supabase";

export default function FileUploadButton({
  setIsUploading,
  disabled,
}: {
  setIsUploading: (value: boolean) => void;
  disabled: boolean;
}) {
  const toast = useToastController();

  const [progress, setProgress] = useState(0);

  return (
    <Button
      variant="outlined"
      disabled={disabled}
      disabledStyle={{ opacity: 0.5 }}
      h={50}
      onPress={async () => {
        const result = await DocumentPicker.getDocumentAsync();

        if (result.canceled) {
          toast.show("Failed to pick a document", {
            native: true,
          });
          return;
        }

        console.log(result);
      }}
    >
      upload
    </Button>
  );
}
