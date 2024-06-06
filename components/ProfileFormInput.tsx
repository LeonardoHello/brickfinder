import { memo } from "react";
import { Control, Controller } from "react-hook-form";

import { Asterisk } from "@tamagui/lucide-icons";
import { Input, Label, YStack } from "tamagui";

import type { FormSchema } from "./ProfileForm";

export default memo(function UserProfileFormInput({
  control,
  name,
  label,
  required,
}: {
  control: Control<FormSchema>;
  name: keyof FormSchema;
  label: string;
  required?: boolean;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <YStack>
          <Label disabled={field.disabled || required}>
            {label}
            {required && <Asterisk scale={0.7} color={"$red10"} />}
          </Label>
          <Input
            value={field.value as string}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            disabled={field.disabled || required}
            h={"$5"}
            bw={0}
            disabledStyle={{ opacity: 0.5 }}
          />
        </YStack>
      )}
    />
  );
});
