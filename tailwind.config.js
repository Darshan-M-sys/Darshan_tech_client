/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 30s linear infinite",
        marqueeReverse: "marqueeReverse 30s linear infinite",

        slideIn: "slideIn 0.4s ease-out",
        fadeOut: "fadeOut 0.4s ease-in forwards",
        progress: "progress 3s linear",
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },

        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },

        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },

        fadeOut: {
          "100%": { transform: "translateX(120%)", opacity: "0" },
        },

        progress: {
          "0%": { width: "100%" },
          "100%": { width: "0%" },
        },
      },

      colors: {
        myBg: "red",
      },
    },
  },
  plugins: [],
};
