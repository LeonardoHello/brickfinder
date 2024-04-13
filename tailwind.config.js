/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "inter-thin": "Inter-Thin",
        "inter-extralight": "Inter-ExtraLight",
        "inter-light": "Inter-Light",
        "inter-regular": "Inter-Regular",
        "inter-medium": "Inter-Medium",
        "inter-semibold": "Inter-SemiBold",
        "inter-bold": "Inter-Bold",
        "inter-extrabold": "Inter-ExtraBold",
        "inter-black": "Inter-Black",
      },
    },
  },
  plugins: [],
};
