import { FontAwesome6 } from "@expo/vector-icons";
import {
  Home,
  LogIn,
  LogOut,
  LucideIcon,
  MoonStar,
  Search,
  Settings,
  Sun,
  User,
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

interopIcon(Home);
interopIcon(LogIn);
interopIcon(LogOut);
interopIcon(MoonStar);
interopIcon(Search);
interopIcon(Settings);
interopIcon(Sun);
interopIcon(User);
cssInterop(FontAwesome6, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, opacity: true },
  },
});

export {
  FontAwesome6,
  Home,
  LogIn,
  LogOut,
  MoonStar,
  Search,
  Settings,
  Sun,
  User,
};
