import { memo } from "react";
import { Control, useFieldArray } from "react-hook-form";
import { FlatList } from "react-native";

import { X } from "@tamagui/lucide-icons";
import { Button, Input, Label, Separator, XStack, YStack } from "tamagui";

import type { FormSchema } from "./ProfileForm";
import ProfileFormFieldArrayItem from "./ProfileFormFieldArrayItem";
import Jobs from "@/lib/constants/Jobs";

export default memo(function ProfileFormFieldArray({
  control,
  disabled,
}: {
  control: Control<FormSchema>;
  disabled: boolean;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const addSkill = () => {
    if (disabled) return;

    append({
      job: Jobs[0],
      yearsOfExperience: "0",
    });
  };

  if (!fields.length) {
    return (
      <YStack onPress={addSkill} disabled={disabled}>
        <Input
          value="No skills selected"
          disabled={disabled}
          readOnly
          textAlign="center"
          bw={0}
          h={"$5"}
          disabledStyle={{ opacity: 0.5 }}
        />
      </YStack>
    );
  }

  return (
    <YStack>
      <XStack>
        <Label
          disabled={disabled}
          flex={1}
          size={"$2"}
          color={"gray"}
          textTransform="uppercase"
        >
          job
        </Label>
        <Label
          disabled={disabled}
          size={"$2"}
          mr={"$9"}
          color={"gray"}
          textTransform="uppercase"
          disabledStyle={{ mr: "$3" }}
        >
          yrs. exp.
        </Label>
      </XStack>

      <FlatList
        data={fields}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <Separator mt={"$2"} borderWidth={0} />}
        renderItem={({ index }) => (
          <ProfileFormFieldArrayItem control={control} index={index}>
            {!disabled && (
              <Button
                variant="outlined"
                icon={X}
                h={"full"}
                px={0}
                w={"$2.5"}
                onPress={() => remove(index)}
              />
            )}
          </ProfileFormFieldArrayItem>
        )}
        keyExtractor={(item) => item.id}
      />
      {!disabled && (
        <Button variant="outlined" mt={"$2"} onPress={addSkill}>
          Add skill
        </Button>
      )}
    </YStack>
  );
});
