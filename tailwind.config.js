module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: ["hover", "active", "focus", "group-hover", "group-active"],
  plugins: [require("tailwind-scrollbar-hide")],
};
