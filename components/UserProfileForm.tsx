import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { FlatList } from "react-native";

import { X } from "@tamagui/lucide-icons";
import {
  Button,
  Form,
  Input,
  Label,
  SizableText,
  Spinner,
  Theme,
  XStack,
  YStack,
} from "tamagui";
import { z } from "zod";

import UserProfileSelect from "./UserProfileSelect";
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
    formState: { errors },
  } = useForm({
    disabled: !edit,
    defaultValues: rest,
  });

  const { fields, append, remove } = useFieldArray({
    name: "skills",
    control,
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
    },
    onError: async (error) => {
      await utils.user.getById.refetch(id, {}, { throwOnError: true });

      // TODO: implement toast error
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    updateUser.mutate({ ...data, userId: id });
  };

  const handleEditCancel = () => {
    reset();

    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const addSkill = () => {
    append({
      job: SKILLS["jobs"][fields.length],
      yearsOfExperience: SKILLS["yearsOfExperience"][0],
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} gap={"$4"}>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value, disabled } }) => (
          <YStack>
            <Label htmlFor="firstName" disabled={disabled}>
              First name
            </Label>
            <Input
              id="firstName"
              onBlur={onBlur}
              onChangeText={onChange}
              disabled={disabled}
              value={value}
              disabledStyle={{ opacity: 0.5 }}
              h={"$5"}
              bw={0}
            />
          </YStack>
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, onBlur, value, disabled } }) => (
          <YStack>
            <Label htmlFor="lastName" disabled={disabled}>
              Last name
            </Label>
            <Input
              id="lastName"
              onBlur={onBlur}
              onChangeText={onChange}
              disabled={disabled}
              value={value}
              disabledStyle={{ opacity: 0.5 }}
              h={"$5"}
              bw={0}
            />
          </YStack>
        )}
      />

      <Controller
        control={control}
        name="email"
        disabled
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value, disabled } }) => (
          <YStack>
            <XStack alignItems="center" gap={"$1.5"}>
              <Label htmlFor="email" disabled={disabled}>
                Email address
              </Label>
              <SizableText size={"$6"} color={"$red10"}>
                *
              </SizableText>
            </XStack>
            <Input
              id="email"
              onBlur={onBlur}
              onChangeText={onChange}
              disabled={disabled}
              value={value}
              disabledStyle={{ opacity: 0.5 }}
              h={"$5"}
              bw={0}
            />

            {errors.email && (
              <SizableText color={"$red5"}>This is required.</SizableText>
            )}
          </YStack>
        )}
      />

      <YStack>
        <Label htmlFor="skills" disabled>
          Skills
        </Label>
        {fields.length === 0 && !edit && (
          <Input
            id="skill"
            disabled
            placeholder="No skills selected"
            textAlign="center"
            bw={0}
            h={"$5"}
            opacity={0.5}
          />
        )}

        {fields.length > 0 && (
          <YStack gap={"$1.5"}>
            <XStack gap={"$2"}>
              <SizableText
                color={"gray"}
                size={"$2"}
                w={edit ? "$18" : "$20"}
                textTransform="uppercase"
              >
                job
              </SizableText>
              <SizableText color={"gray"} size={"$2"} textTransform="uppercase">
                yrs. exp.
              </SizableText>
            </XStack>
            <FlatList
              data={fields}
              scrollEnabled={false}
              renderItem={({ index }) => (
                <XStack gap={"$2"} mt={index !== 0 ? "$2" : 0} h={"$5"}>
                  <XStack w={edit ? "$18" : "$20"}>
                    <Controller
                      control={control}
                      name={`skills.${index}.job`}
                      rules={{
                        required: true,
                        validate: (value, formValues) => {
                          const sameJobs = formValues.skills.filter(
                            (skill) => skill.job === value,
                          );

                          return sameJobs.length < 2;
                        },
                      }}
                      render={({ field }) => (
                        <UserProfileSelect
                          items={SKILLS["jobs"]}
                          label="JOBS"
                          selectProps={{
                            name: field.name,
                            value: field.value,
                            onValueChange: field.onChange,
                          }}
                          SelectTriggerProps={{ disabled: field.disabled }}
                        />
                      )}
                    />
                  </XStack>
                  <XStack w={"$8"}>
                    <Controller
                      control={control}
                      name={`skills.${index}.yearsOfExperience`}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <UserProfileSelect
                          items={SKILLS["yearsOfExperience"]}
                          label="YEARS OF EXPERIENCE"
                          selectProps={{
                            name: field.name,
                            value: field.value,
                            onValueChange: field.onChange,
                          }}
                          SelectTriggerProps={{ disabled: field.disabled }}
                        />
                      )}
                    />
                  </XStack>

                  {edit && (
                    <Button
                      variant="outlined"
                      icon={X}
                      h={"full"}
                      px={0}
                      w={"$2.5"}
                      onPress={() => remove(index)}
                    />
                  )}
                </XStack>
              )}
              keyExtractor={(item) => item.id}
            />
            {errors.skills && (
              <SizableText color={"$red5"}>
                Selected jobs must be unique.
              </SizableText>
            )}
          </YStack>
        )}

        {edit && (
          <Button
            variant="outlined"
            mt={fields.length > 0 ? "$2" : 0}
            onPress={addSkill}
          >
            Add skill
          </Button>
        )}
      </YStack>

      {!edit && (
        <Button variant="outlined" onPress={handleEdit}>
          Edit profile
        </Button>
      )}

      {edit && (
        <YStack gap={"$2"}>
          <Form.Trigger asChild disabled={updateUser.isLoading}>
            <Button icon={updateUser.isLoading ? () => <Spinner /> : undefined}>
              Update
            </Button>
          </Form.Trigger>
          <Theme name={"red"}>
            <Button onPress={handleEditCancel}>Cancel</Button>
          </Theme>
        </YStack>
      )}
    </Form>
  );
}
