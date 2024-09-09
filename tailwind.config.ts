import type { Config } from "tailwindcss";

const colors = {
  "primary-blue": "#4597f7",
  white: "#fefefe",
  "light-grey": "#a6a6a6",
  black: "#050505",
  "secondary-black": "#191919",
  "slate-grey": "#667085",
  "divider-color": "#e9e9e9",
  "light-blue": "#e8f4fe",
  "sea-green": "#418b4c",
  "grey-text": "#667085",
  red: "#d92c20",
  "amber-orange": "#F7A545",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
export default config;
