import { View } from "react-native";

import { Link } from "expo-router";

import { useUser } from "@clerk/clerk-expo";

import { UserAnonDropdownMenu } from "./UserAnonDropdownMenu";
import { UserDropdownMenu } from "./UserDropdownMenu";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Text } from "./ui/text";
import { EllipsisVertical, Image, UserCircle } from "@/components/Icons";

export function UserButton() {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <Skeleton className="mr-3 h-10 w-10 rounded-full" />;
  }

  if (isSignedIn) {
    return (
      <UserDropdownMenu>
        <Button variant="ghost" size="icon" className="mr-3 rounded-full">
          <Image source={user.imageUrl} className="h-10 w-10 rounded-full" />
        </Button>
      </UserDropdownMenu>
    );
  }

  return (
    <View className="flex-row items-center justify-center gap-2">
      <UserAnonDropdownMenu>
        <Button variant="ghost" size="icon" className="rounded-full">
          <EllipsisVertical className="text-foreground" />
        </Button>
      </UserAnonDropdownMenu>
      <Link href="/(app)/sign-in" asChild>
        <Button
          variant="outline"
          className="mr-3 flex-row gap-2 rounded-full px-2"
        >
          <UserCircle className="text-foreground" strokeWidth={1.25} />
          <Text>Sign in</Text>
        </Button>
      </Link>
    </View>
  );
}
