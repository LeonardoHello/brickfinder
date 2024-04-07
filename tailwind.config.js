/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "inter-light": "Inter_300Light",
        "inter-regular": "Inter_400Regular",
        "inter-medium": "Inter_500Medium",
        "inter-semibold": "Inter_600SemiBold",
        "inter-bold": "Inter_700Bold",
        "inter-light-ios": "Inter-Light",
        "inter-regular-ios": "Inter-Regular",
        "inter-medium-ios": "Inter-Medium",
        "inter-semibold-ios": "Inter-SemiBold",
        "inter-bold-ios": "Inter-Bold",
      },
    },
  },
  plugins: [],
};