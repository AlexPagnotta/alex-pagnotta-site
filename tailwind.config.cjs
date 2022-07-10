/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const addPlugin = require('tailwindcss/plugin')

const BASE_FONT_SIZE_PX = 16

const unitToPx = (val) => `${val}px`
const unitToRem = (val) => `${val}rem`

const pxToRem = (val) => val / BASE_FONT_SIZE_PX
const pxUnitToRem = (val) => unitToRem(pxToRem(val))

module.exports = {
  utils: {
    pxRem: pxUnitToRem,
  },
  content: ['./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#121212',
      pink: {
        500: '#FF8686',
        highlight: 'rgba(255, 134, 134, 0.3)',
      },
      grey: {
        100: '#F8F8F8',
      },
      transparent: 'transparent',
      current: 'currentColor',
    },
    fontFamily: {
      sans: ['Karla', ...defaultTheme.fontFamily.sans],
      serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
    },
    fontSize: {
      'title-1': [pxUnitToRem(40), 1.4],
      'title-1-desktop': [pxUnitToRem(64), 1.4],

      'title-2': [pxUnitToRem(36), 1.4],
      'title-2-desktop': [pxUnitToRem(48), 1.4],

      'title-3': [pxUnitToRem(28), 1.5],
      'title-3-desktop': [pxUnitToRem(36), 1.5],

      'title-4': [pxUnitToRem(24), 1.7],
      'title-4-desktop': [pxUnitToRem(24), 1.7],

      'body-5': [pxUnitToRem(20), 1.6],
      'body-5-desktop': [pxUnitToRem(24), 1.6],

      'body-4': [pxUnitToRem(18), 1.6],
      'body-4-desktop': [pxUnitToRem(20), 1.6],

      'body-3': [pxUnitToRem(16), 1.7],
      'body-3-desktop': [pxUnitToRem(18), 1.6],

      'body-2': [pxUnitToRem(14), 1.7],
      'body-2-desktop': [pxUnitToRem(16), 1.7],

      'body-1': [pxUnitToRem(12), 1.7],
      'body-1-desktop': [pxUnitToRem(14), 1.7],
    },
    fontWeight: { light: 300, regular: 400, bold: 700 },
    extend: {},
  },
  plugins: [
    addPlugin(function ({ addBase }) {
      addBase({
        ':root': {
          fontSize: unitToPx(BASE_FONT_SIZE_PX),
        },
      })
    }),
  ],
}
