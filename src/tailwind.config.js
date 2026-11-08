/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          rail: '#1e1f22',
          sidebar: '#2b2d31',
          chat: '#313338',
          hover: '#35373c',
          active: '#404249',
          accent: '#5865F2',
          accentHover: '#4752C4',
          danger: '#ED4245',
          success: '#23A55A',
          text: '#F2F3F5',
          textMuted: '#949BA4',
          divider: '#3F4147',
        }
      }
    },
  },
  plugins: [],
}