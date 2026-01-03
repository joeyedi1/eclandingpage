import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                navy: {
                    900: '#0f172a',
                    800: '#1e293b',
                },
                gold: {
                    400: '#d4af37',
                    500: '#c5a028',
                    600: '#b08d1f',
                },
                isabelline: {
                    DEFAULT: '#F4EEEB',
                    50: '#FBF8F7',
                    100: '#F4EEEB',
                    200: '#E6DCD8',
                },
                'southern-sand': {
                    DEFAULT: '#EDE3D6',
                    200: '#EDE3D6',
                },
                taupe: {
                    DEFAULT: '#B3A696',
                    400: '#B3A696',
                },
                'vintage-coin': {
                    DEFAULT: '#7A6B5E',
                    400: '#7A6B5E',
                },
                'pine-tree': {
                    DEFAULT: '#292E1E',
                    800: '#3A402A',
                    900: '#292E1E',
                }
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                serif: ['var(--font-playfair)'],
            },
            animation: {
                'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
                'marquee': 'marquee 25s linear infinite',
                'shimmer': 'shimmer 2s infinite',
            },
            keyframes: {
                'border-beam': {
                    '100%': {
                        'offset-distance': '100%',
                    },
                },
                marquee: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                },
                shimmer: {
                    '100%': {
                        transform: 'translateX(100%)',
                    },
                },
            },
        },
    },
    plugins: [],
}
export default config
