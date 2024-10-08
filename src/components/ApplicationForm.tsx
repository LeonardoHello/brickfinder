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
import { Application, ApplicationSchema, ResumeSchema } from "@/db/schema";
import { RouterOutputs } from "@/lib/trpc/router";
import { trpc } from "@/utils/trpc";

const FormSchema = z.object({
  firstName: ApplicationSchema.shape.firstName,
  lastName: ApplicationSchema.shape.lastName,
  email: ApplicationSchema.shape.lastName,
  phoneNumber: ApplicationSchema.shape.phoneNumber,
  resume: ResumeSchema.pick({
    fullPath: true,
    name: true,
    url: true,
  }),
});

export type FormSchema = typeof FormSchema._type;

export default function ApplicationForm({
  userId,
  jobId,
  defaultValues,
}: {
  userId: Application["userId"];
  jobId: Application["jobId"];
  defaultValues: NonNullable<RouterOutputs["application"]["getById"]>;
}) {
  const [isUploading, setIsUploading] = useState(false);

  const toast = useToastController();
  const utils = trpc.useUtils();

  const submitApplication = trpc.application.upsert.useMutation({
    onSuccess: (data) => {
      const { application, resume } = data;

      utils.application.getById.setData({ userId, jobId }, (updater) => {
        if (!updater) {
          if (updater === null) {
            return { ...application, resume };
          }

          return defaultValues;
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
          <Fieldset>
            <Label disabled={field.disabled}>
              First name
              <Asterisk scale={0.7} color={"$red10"} />
            </Label>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              disabled={field.disabled}
              disabledStyle={{ opacity: 0.5 }}
              h={"$5"}
              borderColor={error ? "$red5" : "$colorTransparent"}
              focusStyle={{ bc: "$colorTransparent" }}
            />
            {error && <SizableText color={"$red5"}>Required.</SizableText>}
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
          <Fieldset>
            <Label disabled={field.disabled}>
              Last name
              <Asterisk scale={0.7} color={"$red10"} />
            </Label>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              disabled={field.disabled}
              disabledStyle={{ opacity: 0.5 }}
              h={"$5"}
              borderColor={error ? "$red5" : "$colorTransparent"}
              focusStyle={{ bc: "$colorTransparent" }}
            />
            {error && <SizableText color={"$red5"}>Required.</SizableText>}
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
          <Fieldset>
            <Label disabled={field.disabled}>
              Email address
              <Asterisk scale={0.7} color={"$red10"} />
            </Label>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              disabled={field.disabled}
              disabledStyle={{ opacity: 0.5 }}
              h={"$5"}
              borderColor={error ? "$red5" : "$colorTransparent"}
              focusStyle={{ bc: "$colorTransparent" }}
            />
            {error && (
              <SizableText color={"$red5"}>Invalid email address.</SizableText>
            )}
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
          <Fieldset>
            <Label disabled={field.disabled}>Phone number</Label>
            <Input
              value={field.value}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              disabled={field.disabled}
              disabledStyle={{ opacity: 0.5 }}
              h={"$5"}
              borderColor={error ? "$red5" : "$colorTransparent"}
              focusStyle={{ bc: "$colorTransparent" }}
            />
            {error && (
              <SizableText color={"$red5"}>Invalid phone number.</SizableText>
            )}
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
          <Fieldset horizontal mt={"$2"}>
            <Label disabled={field.disabled} width={160} alignSelf="flex-start">
              Resume
              <Asterisk scale={0.7} color={"$red10"} />
            </Label>

            <YStack flexGrow={1} flexShrink={1}>
              <FileUploadButton
                userId={userId}
                disabled={disabled}
                setValue={setValue}
                isUploading={isUploading}
                setIsUploading={setIsUploading}
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
          {isMutating ? "Applying" : "Apply"}
        </Button>
      </Form.Trigger>
    </Form>
  );
}
