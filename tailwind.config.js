module.exports = {
  content: ["./app/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
