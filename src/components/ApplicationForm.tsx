import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Asterisk } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { isValidPhoneNumber } from "libphonenumber-js";
import {
  Button,
  Fieldset,
  Form,
  Input,
  Label,
  SizableText,
  Spinner,
  YStack,
} from "tamagui";
import { z } from "zod";

import FileUploadButton from "./FileUploadButton";
import {
  Application,
  ApplicationResumeSchema,
  ApplicationSchema,
} from "@/db/schema";
import { RouterOutputs } from "@/lib/trpc/router";
import { trpc } from "@/utils/trpc";

const FormSchema = z.object({
  firstName: ApplicationSchema.shape.firstName,
  lastName: ApplicationSchema.shape.lastName,
  email: ApplicationSchema.shape.lastName,
  phoneNumber: ApplicationSchema.shape.phoneNumber,
  resume: ApplicationResumeSchema.pick({
    key: true,
    name: true,
    url: true,
  }),
});

export type FormSchema = typeof FormSchema._type;

export default function ApplicationForm({
  userId,
  jobId,
  defaultValues,
  closeDialog,
}: {
  userId: Application["userId"];
  jobId: Application["jobId"];
  defaultValues: NonNullable<RouterOutputs["application"]["getById"]>;
  closeDialog: () => void;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const toast = useToastController();
  const utils = trpc.useUtils();

  const submitApplication = trpc.application.submit.useMutation({
    onSuccess: (data) => {
      const [[application], [resume]] = data;

      utils.application.getById.setData({ userId, jobId }, (updater) => {
        if (!updater) {
          if (updater === null) {
            return { ...application, resume };
          }

          return utils.user.getByApplicationId.getData();
        }

        return { ...application, resume };
      });

      utils.job.getAllByUserId.setData(userId, (updater) => {
        if (!updater) {
          return utils.job.getAllByUserId.getData(userId);
        }

        return updater.map((data) => {
          if (data.id !== jobId) return data;

          return { ...data, applications: [{ userId, jobId }] };
        });
      });

      closeDialog();

      toast.show("Success!", {
        message: "Application successfully submitted!",
        native: false,
      });
    },
    onError: () => {
      toast.show("Something went wrong!", {
        native: true,
      });
    },
  });

  const values = {
    ...defaultValues,
    // resumes could be null
    resume: defaultValues.resume ?? { key: "", name: "", url: "" },
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { disabled, isSubmitting },
  } = useForm({
    values,
    defaultValues: values,
    disabled: submitApplication.isLoading,
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const { resume, ...rest } = data;

    submitApplication.mutate({
      application: { ...rest, userId, jobId },
      resume,
    });
  };

  const isMutating = submitApplication.isLoading || isSubmitting;

  return (
    <Form onSubmit={handleSubmit(onSubmit)} gap={"$4"}>
      <Controller
        control={control}
        name="firstName"
        rules={{
          required: true,
        }}
        render={({ field, fieldState: { error } }) => (
          <Fieldset gap="$4" horizontal>
            <Label disabled={field.disabled} width={160} alignSelf="flex-start">
              First name
              <Asterisk scale={0.7} color={"$red10"} />
            </Label>

            <YStack flexGrow={1} flexShrink={1}>
              <Input
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                disabled={field.disabled}
                disabledStyle={{ opacity: 0.5 }}
                h={50}
                borderColor={error ? "$red5" : undefined}
              />
              {error && <SizableText color={"$red5"}>Required.</SizableText>}
            </YStack>
          </Fieldset>
        )}
      />

      <Controller
        control={control}
        name="lastName"
        rules={{
          required: true,
        }}
        render={({ field, fieldState: { error } }) => (
          <Fieldset gap="$4" horizontal>
            <Label disabled={field.disabled} width={160} alignSelf="flex-start">
              Last name
              <Asterisk scale={0.7} color={"$red10"} />
            </Label>

            <YStack flexGrow={1} flexShrink={1}>
              <Input
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                disabled={field.disabled}
                disabledStyle={{ opacity: 0.5 }}
                h={50}
                borderColor={error ? "$red5" : undefined}
              />
              {error && <SizableText color={"$red5"}>Required.</SizableText>}
            </YStack>
          </Fieldset>
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: true,
          validate: (val) => z.string().email().safeParse(val).success,
        }}
        render={({ field, fieldState: { error } }) => (
          <Fieldset gap="$4" horizontal>
            <Label disabled={field.disabled} width={160} alignSelf="flex-start">
              Email address
              <Asterisk scale={0.7} color={"$red10"} />
            </Label>

            <YStack flexGrow={1} flexShrink={1}>
              <Input
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                disabled={field.disabled}
                disabledStyle={{ opacity: 0.5 }}
                h={50}
                borderColor={error ? "$red5" : undefined}
              />
              {error && (
                <SizableText color={"$red5"}>
                  Invalid email address.
                </SizableText>
              )}
            </YStack>
          </Fieldset>
        )}
      />

      <Controller
        control={control}
        name="phoneNumber"
        rules={{
          validate: (val) => {
            if (val.length === 0) {
              return true;
            }
            return isValidPhoneNumber(val, "HR");
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Fieldset gap="$4" horizontal>
            <Label disabled={field.disabled} width={160} alignSelf="flex-start">
              Phone number
            </Label>

            <YStack flexGrow={1} flexShrink={1}>
              <Input
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                disabled={field.disabled}
                disabledStyle={{ opacity: 0.5 }}
                h={50}
                borderColor={error ? "$red5" : undefined}
              />
              {error && (
                <SizableText color={"$red5"}>Invalid phone number.</SizableText>
              )}
            </YStack>
          </Fieldset>
        )}
      />

      <Controller
        control={control}
        name="resume.name"
        rules={{
          required: true,
        }}
        render={({ field, fieldState: { error } }) => (
          <Fieldset gap="$4" horizontal>
            <Label disabled={field.disabled} width={160} alignSelf="flex-start">
              Resume
              <Asterisk scale={0.7} color={"$red10"} />
            </Label>

            <YStack flexGrow={1} flexShrink={1}>
              <FileUploadButton
                setIsUploading={setIsUploading}
                disabled={disabled}
              />
              {field.value && <SizableText>{field.value}</SizableText>}

              {!field.value && !isUploading && error && (
                <SizableText color={"$red5"}>Required.</SizableText>
              )}
            </YStack>
          </Fieldset>
        )}
      />
      <Form.Trigger asChild disabled={disabled || isSubmitting || isUploading}>
        <Button
          iconAfter={isMutating ? Spinner : undefined}
          disabledStyle={{ opacity: 0.5 }}
        >
          {isMutating ? "Submitting" : "Submit"}
        </Button>
      </Form.Trigger>
    </Form>
  );
}
