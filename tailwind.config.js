/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'error-pink': '#F0C9C8',
                'success-green': '#C9E5DA',
            },
            keyframes: {
                fadeOut: {
                    '0%': { opacity: 1 },
                    '66%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
            },
            animation: {
                fadeOut: 'fadeOut 3s ease-in-out',
            },
        },
    },
    plugins: [],
};
