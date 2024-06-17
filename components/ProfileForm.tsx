import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Form,
  Label,
  SizableText,
  Spinner,
  Theme,
  YStack,
} from "tamagui";
import { z } from "zod";

import ProfileFormFieldArray from "./ProfileFormFieldArray";
import ProfileFormInputs from "./ProfileFormInputs";
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
  currentUser: { id, updatedAt, ...rest },
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
      console.log("hehehehe");

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
      <ProfileFormInputs control={ctrl} />

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
