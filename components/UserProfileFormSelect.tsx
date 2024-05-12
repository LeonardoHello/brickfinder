import { useMemo } from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import { FlatList } from "react-native";

import { X } from "@tamagui/lucide-icons";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import {
  Adapt,
  Button,
  Input,
  Select,
  type SelectProps,
  type SelectTriggerProps,
  Sheet,
  SizableText,
  XStack,
  YStack,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import type { FormSchema } from "./UserProfileForm";
import Skills from "@/lib/constants/Skills";

export default function UserProfileFormSelect({
  control,
  edit,
  isError,
}: {
  control: Control<FormSchema>;
  edit: boolean;
  isError: boolean;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const addSkill = () => {
    append({
      job: Skills["jobs"][fields.length],
      yearsOfExperience: Skills["yearsOfExperience"][0],
    });
  };

  if (fields.length === 0 && !edit) {
    return (
      <Input
        placeholder="No skills selected"
        disabled
        editable={false}
        textAlign="center"
        bw={0}
        h={"$5"}
        opacity={0.5}
      />
    );
  }

  return (
    <>
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
                    <SkillSelect
                      items={Skills["jobs"]}
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
                    <SkillSelect
                      items={Skills["yearsOfExperience"]}
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
        {isError && (
          <SizableText color={"$red5"}>
            Selected jobs must be unique.
          </SizableText>
        )}
      </YStack>

      {edit && (
        <Button
          variant="outlined"
          mt={fields.length > 0 ? "$2" : 0}
          onPress={addSkill}
        >
          Add skill
        </Button>
      )}
    </>
  );
}

function SkillSelect({
  items,
  label,
  selectProps,
  SelectTriggerProps,
}: {
  items: (typeof Skills)["jobs"] | (typeof Skills)["yearsOfExperience"];
  label: string;
  selectProps?: SelectProps;
  SelectTriggerProps?: SelectTriggerProps;
}) {
  return (
    <Select disablePreventBodyScroll {...selectProps}>
      <Select.Trigger iconAfter={ChevronDown} bw={0} {...SelectTriggerProps}>
        <Select.Value />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: "spring",
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["$background", "transparent"]}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>{label}</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item}
                      value={item.toLowerCase()}
                    >
                      <Select.ItemText>{item}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [items],
            )}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={["transparent", "$background"]}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}
