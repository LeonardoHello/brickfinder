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
import { UploadedFileData } from "uploadthing/types";
import { z } from "zod";

import FileUploadButton from "@/components/FileUploadButton";
import {
  Application,
  ApplicationResumeSchema,
  ApplicationSchema,
} from "@/db/schema";
import { RouterOutputs } from "@/lib/trpc/router";
import { trpc } from "@/utils/trpc";

type Resume = Pick<UploadedFileData, "key" | "name" | "url">;

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
}: {
  userId: Application["userId"];
  jobId: Application["jobId"];
  defaultValues: NonNullable<RouterOutputs["user"]["getByApplicationId"]>;
}) {
  const toast = useToastController();

  const submitApplication = trpc.application.submit.useMutation({
    onSuccess: () => {
      toast.show("Successfully submited!", {
        native: true,
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
    formState: { disabled, isSubmitSuccessful, isSubmitting },
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

  const setResume = (resume: Resume) => {
    setValue("resume.key", resume.key);
    setValue("resume.name", resume.name);
    setValue("resume.url", resume.url);
  };

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
                disabled={field.disabled}
                setResume={setResume}
              />
              {field.value && <SizableText>{field.value}</SizableText>}

              {!field.value && error && (
                <SizableText color={"$red5"}>Required.</SizableText>
              )}
            </YStack>
          </Fieldset>
        )}
      />
      <Form.Trigger asChild disabled={disabled || isSubmitting}>
        <Button icon={isSubmitting || disabled ? Spinner : undefined}>
          {isSubmitSuccessful ? "Submited" : "Submit"}
        </Button>
      </Form.Trigger>
    </Form>
  );
}
