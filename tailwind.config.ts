import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
    "./app/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: ["var(--font-vazirmatn)"],
        lalezar: ["var(--font-lalezar)"],
        ubuntu: ["var(--font-ubuntu)"],
        roboto: ["var(--font-roboto)"],
      },
    },
  },
  plugins: [],
};

export default config;
