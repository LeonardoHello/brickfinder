import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, Form, Label, Spinner, Theme, YStack } from "tamagui";
import { z } from "zod";

import UserProfileFormInput from "./UserProfileFormInput";
import Ajoj from "./UserProfileFormSelect";
import UserProfileFormSelect from "./UserProfileFormSelect";
import SKILLS from "@/lib/constants/Skills";
import { UserSchema } from "@/lib/db/schema";
import { trpc } from "@/lib/utils/trpc";
import { RouterOutputs } from "@/trpc/routers";

const FormSchema = z.object({
  firstName: UserSchema.shape.firstName.trim(),
  lastName: UserSchema.shape.lastName.trim(),
  email: UserSchema.shape.email.email(),
  skills: z
    .object({
      job: z.enum(SKILLS.jobs),
      yearsOfExperience: z.enum(SKILLS.yearsOfExperience),
    })
    .array(),
});

export type FormSchema = typeof FormSchema._type;

export default function UserProfileForm({
  currentUser: { id, updatedAt, ...rest },
}: {
  currentUser: NonNullable<RouterOutputs["user"]["getById"]>;
}) {
  const [edit, setEdit] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    disabled: !edit,
    defaultValues: rest,
  });

  const utils = trpc.useUtils();
  const updateUser = trpc.user.update.useMutation({
    onSuccess: (data) => {
      const newData = data[0];

      utils.user.getById.setData(id, (updater) => {
        if (!updater) {
          return utils.user.getById.getData();
        }

        return { ...updater, ...newData };
      });

      setEdit(false);

      // TODO: toast success message
    },
    onError: async (error) => {
      await utils.user.getById.refetch(id, {}, { throwOnError: true });

      // TODO: toast error message
    },
  });

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
      <UserProfileFormInput
        control={control}
        name="firstName"
        label="First name"
      />
      <UserProfileFormInput
        control={control}
        name="lastName"
        label="First name"
      />
      <UserProfileFormInput
        control={control}
        name="email"
        label="Email address"
        required
      />
      <YStack>
        <Label>Skills</Label>
        <UserProfileFormSelect
          control={control}
          edit={edit}
          isError={!!errors.skills}
        />
      </YStack>

      {!edit && (
        <Button variant="outlined" onPress={handleEnableEdit}>
          Edit
        </Button>
      )}

      {edit && (
        <YStack gap={"$2"}>
          <Form.Trigger asChild disabled={updateUser.isLoading}>
            <Button
              icon={isSubmitting || updateUser.isLoading ? Spinner : undefined}
            >
              Update
            </Button>
          </Form.Trigger>
          <Theme name={"red"}>
            <Button onPress={handleCancelEdit}>Cancel</Button>
          </Theme>
        </YStack>
      )}
    </Form>
  );
}
