/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1677ff',
        'bg-dark': '#0a0e1a',
        'bg-card': '#0f1629',
        'bg-sidebar': '#080c18',
        'text-primary': '#e2e8f0',
        'text-secondary': '#94a3b8',
        'border-dark': '#1e293b',
        'signal-long': '#22c55e',
        'signal-short': '#ef4444',
        'signal-wait': '#f59e0b',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // disable preflight เพื่อไม่ conflict กับ Ant Design
  },
}