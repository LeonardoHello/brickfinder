import { useState } from "react";

import { Link } from "expo-router";

import { MoonStar, Settings, Sun } from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";
import { useThemeToggle } from "@/lib/hooks/useThemeToggle";

export function UserAnonDropdownMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const { isDarkColorScheme, themeToggle } = useThemeToggle();

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(newVal) => {
        setOpen(newVal);
      }}
    >
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" sideOffset={12} align="end">
        <DropdownMenuItem onPress={themeToggle}>
          <Text>Theme</Text>
          <DropdownMenuShortcut>
            {isDarkColorScheme ? (
              <MoonStar className="text-foreground" size={24} />
            ) : (
              <Sun className="text-foreground" size={24} />
            )}
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <Link href="/(app)/settings" asChild>
          <DropdownMenuItem>
            <Text>Settings</Text>
            <DropdownMenuShortcut>
              <Settings className="text-foreground" size={24} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
