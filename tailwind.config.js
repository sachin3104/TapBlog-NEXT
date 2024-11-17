/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lavender: {
          50: "#f9f8fc",
          100: "#f3f1fa",
          200: "#e4def4",
          800: "#6a5e99",
          900: "#574c83",
        },
      },
    },
  },
  plugins: [],
};
