/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Gray
        "gray-60": "#686868",
        "gray-40": "#A7A7A7",
        "gray-25": "#E0E0E0",
        "gray-21": "#EEEDED",
        "gray-20": "#EFF0F6",
        "gray-10": "#F6F6F9",

        // Primary
        primary: "#00E3C2",
        "primary-ultra-light": "#B2E7DF",

        // Secondary
        secondary: "#060F26",
        "secondary-light": "#2D313D",
        "secondary-lighter": "#606B89",

        // Success
        green: "#05BE50",
        "green-lighter": "#D9FFE8",

        // Warning
        red: "#FF3D4A",
        "red-lighter": "#F1E1E4",

        // Informative
        blue: "#456DD3",
        "blue-lighter": "#D2E9FF",
        "blue-ultra-light": "#E8EEF4",
      },
      fontFamily: {
        thin: ["Montserrat_100Thin"],
        extralight: ["Montserrat_200ExtraLight"],
        light: ["Montserrat_300Light"],
        regular: ["Montserrat_400Regular"],
        medium: ["Montserrat_500Medium"],
        semibold: ["Montserrat_600SemiBold"],
        bold: ["Montserrat_700Bold"],
        extrabold: ["Montserrat_800ExtraBold"],
        black: ["Montserrat_900Black"],
      },
      fontSize: {
        xs: 10,
        sm: 12,
        base: 14,
        md: 16,
        lg: 18,
        xl: 20,
        "2xl": 24,
        "3xl": 28,
        "4xl": 32,
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "12px",
        base: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "32px",
        "3xl": "40px",
        "4xl": "48px",
        "5xl": "64px",
      },
    },
  },
  plugins: [],
};
