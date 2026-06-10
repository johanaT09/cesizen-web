import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',

  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        footer: 'var(--footer)',
        navbar: 'var(--navbar)',

        backgroundPrimary: 'var(--background-primary)',

        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',

        buttonPrimary: 'var(--button-primary)',
        buttonSecondary: 'var(--button-secondary)',

        buttonPrimaryDegrade1: 'var(--button-primary-degrade-1)',
        buttonPrimaryDegrade2: 'var(--button-primary-degrade-2)',

        buttonSecondaryDegrade1: 'var(--button-secondary-degrade-1)',
        buttonSecondayDegrade2: 'var(--button-secondary-degrade-2)',

        textVert: 'var(--text-vert)',

        degrade1: 'var(--degrade-1)',
        degrade2: 'var(--degrade-2)',
        degrade3: 'var(--degrade-3)',
      },

      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Roboto Condensed', 'sans-serif']
      }
    }
  }
}