import { Image } from "expo-image";

import { FontAwesome6 } from "@expo/vector-icons";
import {
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Dog,
  EllipsisVertical,
  Home,
  LogIn,
  LogOut,
  LucideIcon,
  MoonStar,
  Search,
  Settings,
  Sun,
  Trash,
  User,
  UserCircle,
  UserCog,
} from "lucide-react-native";
import { cssInterop } from "nativewind";

function interopIcon(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

cssInterop(FontAwesome6, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, opacity: true },
  },
});
cssInterop(Image, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: true,
      opacity: true,
    },
  },
});
interopIcon(Check);
interopIcon(ChevronDown);
interopIcon(ChevronRight);
interopIcon(ChevronUp);
interopIcon(Dog);
interopIcon(EllipsisVertical);
interopIcon(Home);
interopIcon(LogIn);
interopIcon(LogOut);
interopIcon(MoonStar);
interopIcon(Search);
interopIcon(Settings);
interopIcon(Sun);
interopIcon(Trash);
interopIcon(User);
interopIcon(UserCircle);
interopIcon(UserCog);

export {
  Image,
  FontAwesome6,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Dog,
  EllipsisVertical,
  Home,
  LogIn,
  LogOut,
  MoonStar,
  Search,
  Settings,
  Sun,
  Trash,
  User,
  UserCircle,
  UserCog,
};
