import type { Config } from "tailwindcss";

const colors = {
  "primary-text": "#f0f0f0",
  "primary-blue": "#4597f7",
  white: "#fefefe",
  "light-grey": "#a6a6a6",
  black: "#050505",
  "secondary-black": "#191919",
  "slate-grey": "#667085",
  "divider-color": "#e9e9e9",
  "light-blue": "#e8f4fe",
  "selected-blue": "#b6d8fb",
  platinum: "#e7e7e7",
  "lapis-lazuli": "#3d668e",
  "sea-green": "#418b4c",
  "light-sea-green": "#CBE7CF",
  gold: "#cc9200",
  eminence: "#7a3a92",
  "persian-red": "#ce3a30",
  "cocoa-brown": "#dc6803",
  "border-color": "#e8f4fe",
  "grey-text": "#667085",
  red: "#d92c20",
  "amber-orange": "#F7A545",
  "mid-grey": "#808080",
  "neutral-150": "rgb(237 237 237)",
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
