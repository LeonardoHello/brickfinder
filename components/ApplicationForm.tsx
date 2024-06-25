import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Asterisk } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { isValidPhoneNumber } from "libphonenumber-js";
import { Button, Form, H1, Spinner, YStack } from "tamagui";
import { Fieldset, Input, Label, SizableText } from "tamagui";
import { ScrollView } from "tamagui";
import { z } from "zod";

import FileUploadButton from "./FileUploadButton";
import { ApplicationSchema, Job } from "@/db/schema";
import { RouterOutputs } from "@/lib/trpc/router";
import { trpc } from "@/utils/trpc";

const FormSchema = ApplicationSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  phoneNumber: true,
  resume: true,
});

export type FormSchema = typeof FormSchema._type;

export default function ApplicationForm({
  currentUser,
  jobId,
}: {
  currentUser: NonNullable<RouterOutputs["user"]["getById"]>;
  jobId: Job["id"];
}) {
  const { id, updatedAt, skills, ...rest } = currentUser;

  const toast = useToastController();

  const createApplication = trpc.application.create.useMutation({
    onSuccess: (data) => {
      toast.show("Successfully submited!", {
        native: true,
      });
    },
    onError: () => {},
  });

  const {
    control,
    handleSubmit,
    formState: { disabled, isSubmitSuccessful, isSubmitting },
  } = useForm({
    values: rest,
    defaultValues: rest,
    disabled: createApplication.isLoading,
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    createApplication.mutate({ ...data, userId: id, jobId });
  };

  return (
    <ScrollView>
      <Form onSubmit={handleSubmit(onSubmit)} gap={"$4"}>
        <Controller
          control={control}
          name="firstName"
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <Fieldset gap="$4" horizontal>
              <Label
                disabled={field.disabled}
                width={160}
                alignSelf="flex-start"
              >
                First name
                <Asterisk scale={0.7} color={"$red10"} />
              </Label>

              <YStack flexGrow={1}>
                <Input
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  disabled={field.disabled}
                  disabledStyle={{ opacity: 0.5 }}
                  h={50}
                  flex={1}
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
              <Label
                disabled={field.disabled}
                width={160}
                alignSelf="flex-start"
              >
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
                  borderColor={error ? "$red5" : undefined}
                  h={50}
                  flex={1}
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
              <Label
                disabled={field.disabled}
                width={160}
                alignSelf="flex-start"
              >
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
                  flex={1}
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
              <Label
                disabled={field.disabled}
                width={160}
                alignSelf="flex-start"
              >
                Phone number
              </Label>

              <YStack flexGrow={1} flexShrink={1}>
                <Input
                  value={field.value}
                  onBlur={field.onBlur}
                  onChangeText={field.onChange}
                  disabled={field.disabled}
                  disabledStyle={{ opacity: 0.5 }}
                  flex={1}
                  h={50}
                  borderColor={error ? "$red5" : undefined}
                />
                {error && (
                  <SizableText color={"$red5"}>
                    Invalid phone number.
                  </SizableText>
                )}
              </YStack>
            </Fieldset>
          )}
        />

        <Controller
          control={control}
          name="resume"
          rules={{
            required: true,
          }}
          render={({ field, fieldState: { error } }) => (
            <Fieldset gap="$4" horizontal>
              <Label
                disabled={field.disabled}
                width={160}
                alignSelf="flex-start"
              >
                Resume
                <Asterisk scale={0.7} color={"$red10"} />
              </Label>

              <YStack flexGrow={1} flexShrink={1}>
                <FileUploadButton
                  onchange={field.onChange}
                  disabled={field.disabled}
                />
                {field.value && <SizableText>{field.value}</SizableText>}

                {error && <SizableText color={"$red5"}>Required.</SizableText>}
              </YStack>
            </Fieldset>
          )}
        />

        {/* <Dialog.Close displayWhenAdapted asChild> */}
        <Form.Trigger asChild disabled={disabled || isSubmitting}>
          <Button icon={isSubmitting || disabled ? Spinner : undefined}>
            {isSubmitSuccessful ? "Submited" : "Submit"}
          </Button>
        </Form.Trigger>

        {/* </Dialog.Close> */}
      </Form>
    </ScrollView>
  );
}
