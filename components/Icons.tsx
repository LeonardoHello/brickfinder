import {
  Home,
  LogIn,
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
interopIcon(Search);
interopIcon(Settings);
interopIcon(User);

export { Home, LogIn, Search, Settings, User };
