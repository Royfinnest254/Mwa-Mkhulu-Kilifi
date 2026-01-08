import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    900: 'var(--color-primary-900)',
                    800: 'var(--color-primary-800)',
                    50: 'var(--color-primary-50)',
                },
                accent: {
                    600: 'var(--color-accent-600)',
                    50: 'var(--color-accent-50)',
                },
                surface: {
                    50: 'var(--color-surface-50)',
                    white: 'var(--color-surface-white)',
                }
            }
        },
    },
    plugins: [],
};
export default config;
