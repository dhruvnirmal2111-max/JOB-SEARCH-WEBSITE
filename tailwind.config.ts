import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // App palette
        background: "#080810",
        surface: "#0e0e1a",
        "surface-2": "#13131f",
        border: "#1e1e2e",
        "text-muted": "#6b7280",
        // shadcn CSS-variable mappings (dark theme)
        primary: {
          DEFAULT: "#6366f1",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1e1e2e",
          foreground: "#f8fafc",
        },
        muted: {
          DEFAULT: "#13131f",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#1e1e2e",
          foreground: "#f8fafc",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f8fafc",
        },
        card: {
          DEFAULT: "#0e0e1a",
          foreground: "#f8fafc",
        },
        popover: {
          DEFAULT: "#0e0e1a",
          foreground: "#f8fafc",
        },
        ring: "#6366f1",
        input: "#1e1e2e",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          from: { boxShadow: "0 0 10px rgba(99,102,241,0.3)" },
          to: { boxShadow: "0 0 30px rgba(99,102,241,0.7), 0 0 60px rgba(99,102,241,0.3)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
}
export default config
