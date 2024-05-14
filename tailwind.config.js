/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'error-pink': '#F0C9C8',
            },
        },
    },
    plugins: [],
};
