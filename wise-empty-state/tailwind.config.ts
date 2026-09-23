import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import animate from "tailwindcss-animate";

const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-inter)", ...fontFamily.sans] },
      colors: {
        background: token("background"),
        foreground: token("foreground"),
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
        primary: { DEFAULT: token("primary"), foreground: token("primary-foreground") },
        secondary: { DEFAULT: token("secondary"), foreground: token("secondary-foreground") },
        muted: { DEFAULT: token("muted"), foreground: token("muted-foreground") },
        accent: { DEFAULT: token("accent"), foreground: token("accent-foreground") },
        card: { DEFAULT: token("card"), foreground: token("card-foreground") },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "1rem",
      },
      width: { card: "220px" },
      spacing: { 18: "4.5rem", 22: "5.5rem" },
      // Motion tokens: drawers enter slower than they exit, steps move quicker than surfaces
      transitionDuration: { enter: "320ms", exit: "220ms", step: "240ms" },
      transitionTimingFunction: { drawer: "cubic-bezier(0.32, 0.72, 0, 1)" },
      height: { card: "13rem" },
      fontSize: { display: ["2rem", { lineHeight: "2.5rem", letterSpacing: "-0.01em" }] },
      boxShadow: { card: "0 1px 2px 0 rgb(14 15 12 / 0.04), 0 1px 3px 0 rgb(14 15 12 / 0.06)" },
    },
  },
  plugins: [animate],
} satisfies Config;
