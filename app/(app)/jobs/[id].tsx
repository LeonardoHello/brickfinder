import { Stack, useLocalSearchParams } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";
import { Calendar, EyeOff, MapPin } from "@tamagui/lucide-icons";
import {
  Avatar,
  Button,
  Card,
  H2,
  H3,
  H4,
  Paragraph,
  ScrollView,
  Separator,
  SizableText,
  XStack,
  YStack,
} from "tamagui";

import ApplicationDialog from "@/components/ApplicationDialog";
import ScreenLoader from "@/components/ScreenLoader";
import { Job } from "@/db/schema";
import { trpc } from "@/utils/trpc";

export default function JobScreen() {
  const { id } = useLocalSearchParams<{ id: Job["id"] }>();

  if (!id) {
    throw new Error("id parameter not provided.");
  }

  const { userId, isSignedIn, isLoaded } = useAuth();

  const { data: job, isLoading } = trpc.job.getById.useQuery(id);

  if (isLoading || !isLoaded) {
    return <ScreenLoader />;
  }

  if (!job) {
    throw new Error("There was a problem with fetching job information.");
  }

  const {
    title,
    position,
    location,
    description,
    expiresAt,
    company,
    type,
    salary,
    requirements,
    yearsOfExperience,
  } = job;

  return (
    <ScrollView backgroundColor={"$background075"}>
      <YStack flex={1} p={"$3"} gap={"$3"}>
        <Stack.Screen options={{ headerTitle: undefined, title }} />

        <Card elevate size="$4" backgroundColor={"$background075"} bordered>
          <Card.Header padded gap={"$4"}>
            <YStack>
              <H2>{position}</H2>
              {isSignedIn && (
                <Paragraph theme="alt2" fontFamily={"$silkscreen"}>
                  {company.name}
                </Paragraph>
              )}
              {!isSignedIn && (
                <XStack alignItems="center" gap={"$2"}>
                  <SizableText fontFamily={"$silkscreen"} color={"darkgray"}>
                    hidden
                  </SizableText>
                  <EyeOff size={"$1"} color={"darkgray"} />
                </XStack>
              )}
            </YStack>
            <YStack gap={"$2.5"}>
              <XStack gap={"$2"} alignItems="center">
                <Calendar color={"$blue10"} strokeWidth={1.2} />
                <SizableText style={{ fontFamily: "InterLight" }}>
                  Apply until:{" "}
                  <SizableText fontWeight={700}>
                    {expiresAt ? expiresAt.toLocaleDateString("hr") : "-"}
                  </SizableText>
                </SizableText>
              </XStack>
              <XStack gap={"$2"} alignItems="center">
                <MapPin color={"$blue10"} strokeWidth={1.2} />
                <SizableText style={{ fontFamily: "InterLight" }}>
                  Work location:{" "}
                  <SizableText fontWeight={700}>{location}</SizableText>
                </SizableText>
              </XStack>
            </YStack>
            {isSignedIn && (
              <ApplicationDialog userId={userId} jobId={id}>
                <Button
                  theme={"blue"}
                  size={"$4.5"}
                  px={"$6"}
                  alignSelf="flex-start"
                  borderRadius="$10"
                >
                  Apply
                </Button>
              </ApplicationDialog>
            )}
          </Card.Header>
          <Separator />
          <Card.Footer padded gap={"$4"} flexDirection="column">
            <YStack gap={"$1.5"}>
              <H3>Job description</H3>
              {isSignedIn && (
                <Paragraph style={{ fontFamily: "InterLight" }}>
                  {description}
                </Paragraph>
              )}
              {!isSignedIn && (
                <XStack alignItems="center" gap={"$2"}>
                  <SizableText color={"darkgray"} fontFamily={"$silkscreen"}>
                    hidden
                  </SizableText>
                  <EyeOff size={"$1"} color={"darkgray"} />
                </XStack>
              )}
              <YStack>
                <H4 fontSize={"$6"}>Job type</H4>
                <Paragraph style={{ fontFamily: "InterLight" }}>
                  {type}
                </Paragraph>
              </YStack>
              <YStack>
                <H4 fontSize={"$6"}>Salary</H4>
                <Paragraph style={{ fontFamily: "InterLight" }}>
                  €{salary}
                </Paragraph>
              </YStack>
            </YStack>
            <YStack gap={"$1.5"}>
              <H3>Requirements</H3>
              <Paragraph style={{ fontFamily: "InterLight" }}>
                {requirements}
              </Paragraph>
              <YStack>
                <H4 fontSize={"$6"}>Years of experience</H4>
                <Paragraph style={{ fontFamily: "InterLight" }}>
                  {yearsOfExperience}
                </Paragraph>
              </YStack>
            </YStack>
          </Card.Footer>
        </Card>

        {isSignedIn && (
          <Card elevate size="$4" backgroundColor={"$background075"} bordered>
            <Card.Header padded gap={"$4"}>
              <H2>About the company</H2>
              <XStack gap="$3" alignItems="center">
                <Avatar circular size="$8">
                  <Avatar.Image
                    accessibilityLabel="Cam"
                    src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
                  />
                  <Avatar.Fallback backgroundColor="$background" />
                </Avatar>
                <YStack>
                  <H4>{company.name}</H4>
                  <SizableText
                    color={"darkgray"}
                    style={{ fontFamily: "InterLight" }}
                  >
                    {company.email}
                  </SizableText>
                </YStack>
              </XStack>
              <YStack>
                <H4 fontSize={"$6"}>Address</H4>
                <Paragraph style={{ fontFamily: "InterLight" }}>
                  {company.address}
                </Paragraph>
              </YStack>
            </Card.Header>
            <Separator />
            <Card.Footer padded gap={"$4"} flexDirection="column">
              <Paragraph style={{ fontFamily: "InterLight" }}>
                {company.about}
              </Paragraph>
            </Card.Footer>
          </Card>
        )}
      </YStack>
    </ScrollView>
  );
}
