/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryBg: '#0D6CBD',
                secondaryBg: '#F6F7F8',
                gray: '#D9D9D9'
              },
        },
        fontFamily: {
            main: ["Plus Jakarta Sans", "sans-serif"],
        },
    },
    plugins: [],
}
