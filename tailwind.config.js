/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "#f2eab6",
                "dark-background": "#101b26",
            },
        },
    },
    plugins: [],
};
