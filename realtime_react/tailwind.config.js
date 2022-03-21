const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "400px",
      ...defaultTheme.screens,
    },
    extend: {
      keyframes: {
        slider: {
          "0%": {
            transform: "translateX(0px)",
          },
          "100%": {
            transform: "translateX(-1400px)",
          },
        },
      },
      animation: {
        slider: "slider 20s linear infinite",
      },
    },
  },
  plugins: [],
};

// theme: {
//   screens: {
//     'xs': '400px',

//     'sm': '640px',
//     // => @media (min-width: 640px) { ... }

//     'md': '768px',
//     // => @media (min-width: 768px) { ... }

//     'lg': '1024px',
//     // => @media (min-width: 1024px) { ... }

//     'xl': '1280px',
//     // => @media (min-width: 1280px) { ... }

//     '2xl': '1536px',
//     // => @media (min-width: 1536px) { ... }
//   }
// }
// }
