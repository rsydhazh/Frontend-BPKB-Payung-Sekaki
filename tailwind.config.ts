import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a1680",
        secondary: "#93b2f8",
        accent: "#fbedb0",
        action: "#f1b94c",
        background: "#fcfdff",
        text: "#1a1a1a",
      },
    },
  },
  plugins: [],
};

export default config;