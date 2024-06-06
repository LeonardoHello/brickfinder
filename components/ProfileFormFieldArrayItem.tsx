import { useMemo } from "react";
import { Control, Controller } from "react-hook-form";

import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import {
  Adapt,
  Input,
  Select,
  SelectProps,
  Sheet,
  XStack,
  YStack,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import type { FormSchema } from "./ProfileForm";
import Jobs from "@/lib/constants/Jobs";

export default function ProfileFormFieldArrayItem({
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
            return (
              !isNaN(Number(Number(value).toFixed(1))) &&
              Number(Number(value).toFixed(1)) < 100
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
