/** @type {import('tailwindcss').Config} */

const withOpacity = (colorVar) => {
  return ({ opacityValue }) => {
    if (opacityValue) return `rgba(var(--${colorVar}),${opacityValue})`;
    return `rgba(var(--${colorVar}))`;
  };
};

module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: withOpacity("color-primary"),
        secondary: withOpacity("color-secondary"),
      },
      fontFamily: "var(--font-roboto)",
      fontSize: {
        18: ["1.125rem", "2rem"],
        25: "1.5625rem",
        40: ["2.5rem"],
        50: ["3.125rem"],
      },
      fontWeight: {
        regular: 400,
        bold: 700,
      },
      colors: {
        primary: withOpacity("color-primary"),
      },
      gridTemplateColumns: {},
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
