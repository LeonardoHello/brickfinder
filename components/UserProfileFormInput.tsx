import { Control, useController } from "react-hook-form";

import { Asterisk } from "@tamagui/lucide-icons";
import { Input, Label, SizableText, YStack } from "tamagui";

import type { FormSchema } from "./UserProfileForm";

export default function UserProfileFormInput({
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
  const {
    field: { onChange, onBlur, value, disabled },
  } = useController({ control, name });

  return (
    <YStack>
      <Label htmlFor={name} disabled={disabled || name === "email"}>
        {label}
        {required && <Asterisk scale={0.7} color={"$red10"} />}
      </Label>
      <Input
        id={name}
        value={value as string}
        onBlur={onBlur}
        onChangeText={onChange}
        disabled={disabled || name === "email"}
        h={"$5"}
        bw={0}
        disabledStyle={{ opacity: 0.5 }}
      />
    </YStack>
  );
}
