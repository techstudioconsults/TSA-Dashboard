/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable unicorn/prefer-module */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  // prefix: "",
  theme: {
  	extend: {
  		content: {
  			empty: '"',
  			star: '*"'
  		},
  		backgroundImage: {
  			'primary-gradient': 'radial-gradient(50% 50% at 50% 50%, rgba(6, 11, 59, 0) 0%, #060B3B 100%)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			'card-foreground': 'hsl(var(--card-foreground))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			'popover-foreground': 'hsl(var(--popover-foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			'chart-1': 'hsl(var(--chart-1))',
  			'chart-2': 'hsl(var(--chart-2))',
  			'chart-3': 'hsl(var(--chart-3))',
  			'chart-4': 'hsl(var(--chart-4))',
  			'chart-5': 'hsl(var(--chart-5))',
  			white: 'hsl(var(--white))',
  			black: 'hsl(var(--black))',
  			'high-blue': 'hsl(var(--high-blue))',
  			'mid-blue': 'hsl(var(--mid-blue))',
  			'low-blue': 'hsl(var(--low-blue))',
  			'high-danger': 'hsl(var(--high-danger))',
  			'mid-danger': 'hsl(var(--mid-danger))',
  			'low-danger': 'hsl(var(--low-danger))',
  			'high-warning': 'hsl(var(--high-warning))',
  			'mid-warning': 'hsl(var(--mid-warning))',
  			'low-warning': 'hsl(var(--low-warning))',
  			'high-success': 'hsl(var(--high-success))',
  			'mid-success': 'hsl(var(--mid-success))',
  			'low-success': 'hsl(var(--low-success))',
  			'high-grey-III': 'hsl(var(--high-grey-III))',
  			'mid-grey-III': 'hsl(var(--mid-grey-III))',
  			'low-grey-III': 'hsl(var(--low-grey-III))',
  			'high-grey-II': 'hsl(var(--high-grey-II))',
  			'mid-grey-II': 'hsl(var(--mid-grey-II))',
  			'low-grey-II': 'hsl(var(--low-grey-II))',
  			'high-grey-I': 'hsl(var(--high-grey-I))',
  			'mid-grey-I': 'hsl(var(--mid-grey-I))',
  			'low-grey-I': 'hsl(var(--low-grey-I))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '80px'
  				},
  				to: {
  					height: '160px'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: '80px'
  				},
  				to: {
  					height: '160px'
  				}
  			},
  			zoomIn: {
  				'0%': {
  					transform: 'scale(1)'
  				},
  				'100%': {
  					transform: 'scale(1.1)'
  				}
  			}
  		},
  		animation: {
  			'zoom-in': 'zoomIn 10s ease-in-out infinite'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@mertasan/tailwindcss-variables"),
  ],
} satisfies Config;

export default config;
