import { useState } from "react";

import { Link } from "expo-router";

import { useAuth } from "@clerk/clerk-expo";

import { LogOut, MoonStar, Settings, Sun, User } from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";
import { useThemeToggle } from "@/lib/hooks/useThemeToggle";

export function UserDropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const { isLoaded, signOut } = useAuth();
  const { isDarkColorScheme, themeToggle } = useThemeToggle();

  const logout = async () => {
    if (isLoaded) {
      signOut();
    }
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(newVal) => {
        setOpen(newVal);
      }}
    >
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" sideOffset={12} align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/(app)/profile" asChild>
          <DropdownMenuItem>
            <Text>Profile</Text>
            <DropdownMenuShortcut>
              <User className="text-foreground" size={22} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onPress={themeToggle}>
          <Text>Theme</Text>
          <DropdownMenuShortcut>
            {isDarkColorScheme ? (
              <MoonStar className="text-foreground" size={22} />
            ) : (
              <Sun className="text-foreground" size={22} />
            )}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <Link href="/(app)/settings" asChild>
          <DropdownMenuItem>
            <Text>Settings</Text>
            <DropdownMenuShortcut>
              <Settings className="text-foreground" size={22} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onPress={logout}>
          <Text>Log out</Text>
          <DropdownMenuShortcut>
            <LogOut className="text-foreground" size={22} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
