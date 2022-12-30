/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryBg: "#0D6CBD",
                secondaryBg: "#F6F7F8",
                gray: "#D9D9D9",
                inputPlaceholder: "#8FA0AF",
                inputText: "#0E1114",
                error: "#FE2836",
                success: "#1D9745",
            },
            boxShadow: {},
        },
        fontFamily: {
            main: ["Plus Jakarta Sans", "sans-serif"],
        },
    },
    plugins: [],
}
