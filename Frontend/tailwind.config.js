const { default: theme, content } = require("@material-tailwind/react/theme");
const { default: zIndex } = require("@mui/material/styles/zIndex");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        78: `19rem`,
        74: "17.875rem",
      },
      height: {
        13: "3.25rem",
      },
      screens: {
        xs: "375px",
        xxs: "300px",
        'md-820': "820px",
        lg: "800px",
        "lg-1000": "1000px",
        "lg-1024": "1024px",
        lgg: "1100px",
        lggg: "1280px",
      },
      zIndex: {
        100: "1000000",
      },
    },
  },
  plugins: [],
};
