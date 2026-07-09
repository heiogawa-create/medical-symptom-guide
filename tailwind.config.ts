import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'], theme: { extend: { colors: { medical: {50:'#f0f9ff',100:'#e0f2fe',600:'#0284c7'}, mint:{50:'#f0fdf4',100:'#dcfce7',600:'#16a34a'} } } }, plugins: [] };
export default config;
