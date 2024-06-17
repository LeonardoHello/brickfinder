import { memo } from "react";
import { Control, Controller } from "react-hook-form";

import { Asterisk } from "@tamagui/lucide-icons";
import { Fieldset, Input, Label, SizableText } from "tamagui";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";

import type { FormSchema } from "./ProfileForm";

export default memo(function ProfileFormInputs({
  control,
}: {
  control: Control<FormSchema>;
}) {
  return (
    <>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <Fieldset>
            <Label disabled={field.disabled}>First name</Label>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              disabled={field.disabled}
              disabledStyle={{ opacity: 0.5 }}
              h={"$5"}
              bw={0}
            />
          </Fieldset>
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <Fieldset>
            <Label disabled={field.disabled}>Last name</Label>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              disabled={field.disabled}
              disabledStyle={{ opacity: 0.5 }}
              h={"$5"}
              bw={0}
            />
          </Fieldset>
        )}
      />

      <Controller
        control={control}
        name="phoneNumber"
        rules={{
          validate: (validate) =>
            validate.length > 0 ? isMobilePhone(validate) : true,
        }}
        render={({ field, fieldState: { error } }) => (
          <Fieldset>
            <Label disabled={field.disabled}>Phone number</Label>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              disabled={field.disabled}
              disabledStyle={{ opacity: 0.5 }}
              keyboardType="phone-pad"
              h={"$5"}
              bw={0}
            />

            {error && (
              <SizableText color={"$red5"}>Invalid phone number.</SizableText>
            )}
          </Fieldset>
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: true,
          validate: (validate) => isEmail(validate),
        }}
        render={({ field, fieldState: { error } }) => (
          <Fieldset>
            <Label disabled={true}>
              Email address
              <Asterisk scale={0.7} color={"$red10"} />
            </Label>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              disabled={true}
              disabledStyle={{ opacity: 0.5 }}
              h={"$5"}
              bw={0}
            />
            {error && (
              <SizableText color={"$red5"}>Invalid email address.</SizableText>
            )}
          </Fieldset>
        )}
      />
    </>
  );
});
