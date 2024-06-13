import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/Templates/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-112-117-122': 'rgb(112, 117, 122)',
        'rgb-60-64-67': 'rgb(60, 64, 67)',
      },
      fontFamily: {
        sans: ['Google Sans', 'Roboto', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '11px': '11px',
        '22px': [
          '22px',
          {
            lineHeight: '24px',
          },
        ],
        '26px': [
          '26px',
          {
            lineHeight: '46px',
          },
        ],
      },
      width: {
        '1/7': '14.2857143%',
        '124px': '124px',
      },
    },
  },
  plugins: [],
};
export default config;
