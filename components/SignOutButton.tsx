import { useAuth } from "@clerk/clerk-expo";

import { Button } from "./ui/button";
import { LogOut } from "@/components/Icons";

export function SignOut() {
  const { isLoaded, signOut } = useAuth();

  return (
    <Button
      className="mr-2"
      size="icon"
      variant="ghost"
      onPress={() => {
        if (isLoaded) {
          signOut();
        }
      }}
    >
      <LogOut className="text-foreground" />
    </Button>
  );
}
