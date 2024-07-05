import { useLocalSearchParams } from "expo-router";

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
  useTheme,
} from "tamagui";

import ApplicationDialog from "@/components/ApplicationDialog";
import Skeleton from "@/components/Skeleton";
import { Job } from "@/db/schema";
import { trpc } from "@/utils/trpc";

export default function JobScreen() {
  const { id } = useLocalSearchParams<{ id: Job["id"] }>();

  if (!id) {
    throw new Error("id parameter not provided.");
  }

  const { userId, isSignedIn, isLoaded } = useAuth();

  const { data: job, isLoading } = trpc.job.getById.useQuery(id);

  if (!isLoaded || isLoading) {
    return <SkeletonLoader />;
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
        <Card elevate size="$4" backgroundColor={"$background075"} bordered>
          <Card.Header padded gap={"$4"}>
            <YStack>
              <H2>{title}</H2>

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
            <YStack gap={"$2"}>
              {description && (
                <YStack>
                  <H3>Job description</H3>
                  {isSignedIn && (
                    <Paragraph style={{ fontFamily: "InterLight" }}>
                      {description}
                    </Paragraph>
                  )}
                  {!isSignedIn && (
                    <XStack alignItems="center" gap={"$2"}>
                      <SizableText
                        color={"darkgray"}
                        fontFamily={"$silkscreen"}
                      >
                        hidden
                      </SizableText>
                      <EyeOff size={"$1"} color={"darkgray"} />
                    </XStack>
                  )}
                </YStack>
              )}

              <YStack>
                <H4>Position</H4>
                <Paragraph style={{ fontFamily: "InterLight" }}>
                  {position}
                </Paragraph>
              </YStack>

              <YStack>
                <H4>Job type</H4>
                <Paragraph style={{ fontFamily: "InterLight" }}>
                  {type}
                </Paragraph>
              </YStack>

              <YStack>
                <H4>Salary</H4>
                <Paragraph style={{ fontFamily: "InterLight" }}>
                  €{salary}
                </Paragraph>
              </YStack>
            </YStack>
            <YStack gap={"$2"}>
              <YStack>
                <H3>Requirements</H3>
                <Paragraph style={{ fontFamily: "InterLight" }}>
                  {requirements}
                </Paragraph>
              </YStack>

              <YStack>
                <H4>Years of experience</H4>
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
                <H4>Address</H4>
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

function SkeletonLoader() {
  const { background } = useTheme();

  const backgroundColor = background.get();
  return (
    <YStack flex={1} p={"$3"} backgroundColor={"$background075"}>
      <Card elevate size="$4" backgroundColor={"$background075"} bordered>
        <Card.Header padded gap={"$4"}>
          <YStack gap={"$2.5"}>
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={2}
              height={40}
              width={220}
            />
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={20}
              width={200}
            />
          </YStack>

          <YStack gap={"$2.5"}>
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={2}
              height={20}
              width={300}
            />
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={20}
              width={300}
            />
          </YStack>

          <Skeleton
            backgroundColor={backgroundColor}
            borderRadius={200}
            height={50}
            width={100}
          />
        </Card.Header>

        <Separator />

        <Card.Footer padded gap={"$4"} flexDirection="column">
          <YStack gap={"$2.5"}>
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={2}
              height={30}
              width={200}
            />
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={75}
              width={350}
            />
          </YStack>

          <YStack gap={"$2.5"}>
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={2}
              height={20}
              width={150}
            />
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={15}
              width={125}
            />
          </YStack>

          <YStack gap={"$2.5"}>
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={2}
              height={20}
              width={150}
            />
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={15}
              width={125}
            />
          </YStack>

          <YStack gap={"$2.5"}>
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={2}
              height={30}
              width={200}
            />
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={75}
              width={350}
            />
          </YStack>

          <YStack gap={"$2.5"}>
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={2}
              height={20}
              width={150}
            />
            <Skeleton
              backgroundColor={backgroundColor}
              borderRadius={5}
              height={15}
              width={125}
            />
          </YStack>
        </Card.Footer>
      </Card>
    </YStack>
  );
}
