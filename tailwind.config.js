/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                appearance: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                swimRB: {
                    '0%': { transform: 'translate(0px, 0px)' },
                    '50%': { transform: 'translate(13px, 13px)' },
                    '100%': { transform: 'translate(0px, 0px)' },
                },
                swimLB: {
                    '0%': { transform: 'translate(0px, 0px)' },
                    '50%': { transform: 'translate(-13px, 13px)' },
                    '100%': { transform: 'translate(0px, 0px)' },
                },
                swimRU: {
                    '0%': { transform: 'translate(0px, 0px)' },
                    '50%': { transform: 'translate(20px, -20px)' },
                    '100%': { transform: 'translate(0px, 0px)' },
                },
                swimLU: {
                    '0%': { transform: 'translate(0px, 0px)' },
                    '50%': { transform: 'translate(-20px, -20px)' },
                    '100%': { transform: 'translate(0px, 0px)' },
                },
            },
            animation: {
                appearance: 'appearance 0.2s ease-in-out 1',
                swimRB: 'swimRB 6s ease-in-out infinite',
                swimLB: 'swimLB 7s ease-in-out infinite',
                swimRU: 'swimRU 6s ease-in-out infinite',
                swimLU: 'swimLU 7s ease-in-out infinite',
                // test: "test 7s ease-in-out infinite",
            },
            boxShadow: {
                primary: '0 0 15px 0 rgba(0, 0, 0, 0.37)',
            },
            colors: {
                primaryBg: '#0D6CBD',
                secondaryBg: '#F6F7F8',
                gray: '#D9D9D9',
                inputPlaceholder: '#8FA0AF',
                inputText: '#0E1114',
                error: '#FE2836',
                success: '#1D9745',
            },
            boxShadow: {},
        },
        fontFamily: {
            main: ['Plus Jakarta Sans', 'sans-serif'],
        },
    },
    plugins: [],
}
