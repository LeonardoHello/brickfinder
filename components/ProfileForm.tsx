import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Asterisk } from "@tamagui/lucide-icons";
import "tamagui";
import {
  Button,
  Fieldset,
  Form,
  Input,
  Label,
  SizableText,
  Spinner,
  Theme,
  YStack,
} from "tamagui";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import { z } from "zod";

import ProfileFormFieldArray from "./ProfileFormFieldArray";
import { JobSchema, UserSchema } from "@/lib/db/schema";
import { trpc } from "@/lib/utils/trpc";
import { RouterOutputs } from "@/trpc/routers";

const FormSchema = z.object({
  firstName: UserSchema.shape.firstName,
  lastName: UserSchema.shape.lastName,
  phoneNumber: UserSchema.shape.phoneNumber,
  email: UserSchema.shape.email,
  skills: z
    .object({
      job: JobSchema.shape.position,
      yearsOfExperience: z.string(),
    })
    .array(),
});

export type FormSchema = typeof FormSchema._type;

export default function ProfileForm({
  currentUser: { id, updatedAt, resume, ...rest },
}: {
  currentUser: NonNullable<RouterOutputs["user"]["getById"]>;
}) {
  const [edit, setEdit] = useState(false);

  const utils = trpc.useUtils();
  const updateUser = trpc.user.update.useMutation({
    onSuccess: (data) => {
      const newData = data[0];

      utils.user.getById.setData(id, (updater) => {
        if (!updater) {
          return utils.user.getById.getData();
        }

        return { ...updater, ...newData, updatedAt: new Date() };
      });

      setEdit(false);
      // TODO: toast success message
    },
    onError: async (error) => {
      await utils.user.getById.refetch(id, {}, { throwOnError: true });

      // TODO: toast error message
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, disabled },
  } = useForm({
    disabled: !edit || updateUser.isLoading,
    values: rest,
    defaultValues: rest,
  });

  const ctrl = useMemo(() => control, []);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    updateUser.mutate({ ...data, userId: id });
  };

  const handleCancelEdit = () => {
    reset(rest);
    setEdit(false);
  };
  const handleEnableEdit = () => {
    setEdit(true);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} gap={"$4"}>
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

      <YStack>
        <Label>Skills</Label>
        <ProfileFormFieldArray control={ctrl} disabled={disabled} />

        {errors.skills &&
          !!errors.skills.filter!((_) => _ !== undefined)[0]?.job && (
            <SizableText color={"$red5"}>
              Selected jobs must be unique.
            </SizableText>
          )}
        {errors.skills &&
          !!errors.skills.filter!((_) => _ !== undefined)[0]
            ?.yearsOfExperience && (
            <SizableText color={"$red5"}>
              Years of experience must be a valid number under 100.
            </SizableText>
          )}
      </YStack>

      {!disabled && (
        <YStack gap={"$2"}>
          <Theme name={"blue_surface2"}>
            <Form.Trigger asChild disabled={updateUser.isLoading}>
              <Button
                icon={
                  isSubmitting || updateUser.isLoading ? Spinner : undefined
                }
              >
                Update
              </Button>
            </Form.Trigger>
          </Theme>
          <Theme name={"red"}>
            <Button onPress={handleCancelEdit}>Cancel</Button>
          </Theme>
        </YStack>
      )}

      {disabled && <Button onPress={handleEnableEdit}>Edit</Button>}
    </Form>
  );
}
