import { FontAwesome6 } from "@expo/vector-icons";
import {
  Home,
  LogIn,
  LogOut,
  LucideIcon,
  Search,
  Settings,
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
interopIcon(Search);
interopIcon(Settings);
interopIcon(User);
cssInterop(FontAwesome6, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true, opacity: true },
  },
});

export { Home, LogIn, LogOut, Search, Settings, User, FontAwesome6 };
