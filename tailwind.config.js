/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: '#0ea5e9', // Sky blue - Trust, Clarity
                    dark: '#0f172a', // Deep slate - Professionalism
                    orange: '#f97316', // Safety Orange - Construction/Action
                    bg: '#f8fafc', // Light gray background
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
