/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  fontFamily: {
    normal: ['Mooli', 'sans-serif'],
  },
  extend: {
    colors: {
      // Configuración de la paleta de colores
      'orange-main': '#FF7F53',
      'orange-second': '#ff814b',
      'orange-thirty': '#FF9775',
    },
  },
  theme: {
    extend: {
      zIndex: {
        "-1": "-1",
      },
    },
  },
  variants: { borderColor: ["responsive", "hover", "focus", "focus-within"] },
  plugins: [],
  purge: [],
};
export const plugins = [
  require("@tailwindcss/typography"),
  require('@tailwindcss/forms'),
  require("tailwindcss"),
  require("autoprefixer")
];

