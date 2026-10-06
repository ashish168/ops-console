/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        page:  '#F7F8F7',
        panel: '#FFFFFF',
        ink:   '#13181A',
        body:  '#454E51',
        mute:  '#7C8689',
        line:  '#DFE4E3',
        /* status, used only to mean status */
        ok:    '#2F6F4E',
        warn:  '#9A6B00',
        fault: '#A32F25',
        idle:  '#9AA4A6',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
