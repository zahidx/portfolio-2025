/** @type {import('tailwindcss').Config} */ 
export default {
  darkMode: 'class', // Enable manual dark mode toggle using a class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        java: "#FF6F61",
        python: "#3776AB",
        c_cpp: "#00599C",
        html_css: "#E34F26",
        js_jquery: "#F7DF1E",
        customDarkBlue: "#21434E",
        mysql: "#4479A1",
        react_node: "#61DAFB",
      },
      animation: {
        progress: 'progress 2s ease-out forwards', // Smooth width fill to stop at the target
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--tw-progress-width)' }, // Dynamically handled by CSS variables
        },
      },
    },
  },
  plugins: [],
};
