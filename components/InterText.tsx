import { Text as NativeText, Platform } from "react-native";

// created tailwind classes with included -ios classes
const fonts = [
  "inter-light",
  "inter-regular",
  "inter-medium",
  "inter-semibold",
  "inter-bold",
];

export function InterText(props: NativeText["props"]) {
  let { className = "font-inter-regular", ...rest } = props;

  if (Platform.OS === "ios") {
    fonts.forEach((font) => {
      if (className && className.includes(font)) {
        className = className.replace(font, `${font}-ios`);
      }
    });
  }

  return <NativeText {...rest} className={className} />;
}
