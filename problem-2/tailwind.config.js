/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Gradient classes for TokenAvatar
    "from-blue-500",
    "to-indigo-600",
    "from-purple-500",
    "to-pink-500",
    "bg-gradient-to-br",

    // Border classes for TokenInputCard
    "border-gray-200",
    "border-purple-200",
    "hover:border-indigo-300",
    "hover:border-purple-300",

    // Background gradient classes for TokenInputCard
    "from-gray-50",
    "to-gray-100/50",
    "from-purple-50",
    "to-indigo-50",

    // Dynamic pattern matching for common gradients and borders
    {
      pattern:
        /(from|to)-(blue|purple|indigo|pink|gray)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /border-(gray|purple|indigo)-(100|200|300|400)/,
    },
    {
      pattern: /hover:border-(gray|purple|indigo)-(100|200|300|400)/,
    },
  ],
};
