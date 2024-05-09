import { useMemo } from "react";

import { Check, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import {
  Adapt,
  Select,
  type SelectProps,
  type SelectTriggerProps,
  Sheet,
  YStack,
} from "tamagui";
import { LinearGradient } from "tamagui/linear-gradient";

import type SKILLS from "@/lib/constants/Skills";

export default function UserProfileSelect({
  items,
  label,
  selectProps,
  SelectTriggerProps,
}: {
  items: (typeof SKILLS)["jobs"] | (typeof SKILLS)["yearsOfExperience"];
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
