/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false,
    important: false,
    theme: {
        screens: {
            'min-sm': { min: '768px' },
            'min-lg': { min: '1025px' },
            '2xl': { max: '1535px' },
            xl: { max: '1279px' },
            lg: { max: '1024px' },
            md: { max: '991px' },
            sm: { max: '767px' },
            xs: { max: '500px' },
        },
        extend: {
            container: {
                center: true,
                padding: '15px',
            },
            colors: {
                black: {
                    DEFAULT: '#000',
                },
                white: {
                    DEFAULT: '#fff',
                },
                primary: {
                    DEFAULT: '#fc8019',
                },
                secondary: {
                    DEFAULT: '#1F384F',
                },
                grey: {
                    DEFAULT: '#02060c',
                    100: '#f0f0f5',
                },
            },
            fontFamily: {
                body: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            boxShadow: {
                'shadow-sm': '0 4px 4px rgba(0, 0, 0, 0.04)',
                'shadow-md': '0 4px 4px rgba(0, 0, 0, 0.25)',
                'shadow-lg': '0 16px 8px rgba(81, 84, 88, 0.08)',
                'shadow-xl': '0 0 12px rgba(2, 6, 12, 0.15)',
                'shadow-2xl': '0 20px 4px rgba(0, 0, 0, 0.08)',
            },
        },
    },
    plugins: [],
};
