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

import UserProfileFormInput from "./UserProfileFormInput";
import UserProfileFormSelect from "./UserProfileFormSelect";
import Jobs from "@/lib/constants/Jobs";
import { UserSchema } from "@/lib/db/schema";
import { trpc } from "@/lib/utils/trpc";
import { RouterOutputs } from "@/trpc/routers";

const FormSchema = z.object({
  firstName: UserSchema.shape.firstName.trim(),
  lastName: UserSchema.shape.lastName.trim(),
  email: UserSchema.shape.email.email(),
  skills: z
    .object({
      job: z.enum(Jobs),
      yearsOfExperience: z.string(),
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
      <UserProfileFormInput
        control={ctrl}
        name="firstName"
        label="First name"
      />
      <UserProfileFormInput control={ctrl} name="lastName" label="Last name" />
      <UserProfileFormInput
        control={ctrl}
        name="email"
        label="Email address"
        required
      />

      <YStack>
        <Label>Skills</Label>
        <UserProfileFormSelect control={ctrl} disabled={disabled} />

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
