import { memo } from "react";
import { useMemo } from "react";
import { Control, Controller, useFieldArray } from "react-hook-form";
import "react-hook-form";
import { FlatList } from "react-native";

import { X } from "@tamagui/lucide-icons";
import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import {
  Adapt,
  Button,
  Input,
  Label,
  Select,
  SelectProps,
  Separator,
  Sheet,
  XStack,
  YStack,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import type { FormSchema } from "./ProfileForm";
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
      job: Jobs[fields.length],
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
          <ListItem control={control} index={index}>
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
          </ListItem>
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

function ListItem({
  children,
  control,
  index,
}: {
  children: React.ReactNode;
  control: Control<FormSchema>;
  index: number;
}) {
  return (
    <XStack gap={"$2"} h={"$5"} flex={1}>
      <XStack flex={1}>
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
          render={({ field }) => {
            if (field.disabled) {
              return (
                <Input
                  f={1}
                  value={field.value}
                  disabled={field.disabled}
                  readOnly
                  h={"full"}
                  bw={0}
                  disabledStyle={{ opacity: 0.5 }}
                />
              );
            }
            return (
              <SkillSelect
                selectProps={{
                  name: field.name,
                  value: field.value,
                  onValueChange: field.onChange,
                }}
              />
            );
          }}
        />
      </XStack>
      <Controller
        control={control}
        name={`skills.${index}.yearsOfExperience`}
        rules={{
          required: true,
          validate: (value) => {
            const num = Number(value);

            return (
              !isNaN(Number(num.toFixed(1))) && Number(num.toFixed(1)) < 100
            );
          },
        }}
        render={({ field }) => (
          <Input
            value={field.value}
            onBlur={field.onBlur}
            onChangeText={field.onChange}
            disabled={field.disabled}
            keyboardType="numeric"
            w={"$7"}
            h={"full"}
            bw={0}
            textAlign="center"
            disabledStyle={{ opacity: 0.5 }}
          />
        )}
      />
      {children}
    </XStack>
  );
}

function SkillSelect({ selectProps }: { selectProps?: SelectProps }) {
  return (
    <Select disablePreventBodyScroll {...selectProps}>
      <Select.Trigger iconAfter={ChevronDown} h={"full"} bw={0}>
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
            <Select.Label>JOBS</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                Jobs.map((item, i) => {
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
              [Jobs],
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
