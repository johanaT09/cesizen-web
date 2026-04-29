import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        footer: '#fbf9f4', 
        navbar: '#fefcf8',
        backgroundPrimary: '#fdfcf8',
        buttonPrimary: '#00be62',
        buttonSecondary: '#ffde58',
        textPrimary: '#000000',
        textSecondary: '#ffffff',

      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Roboto Condensed', 'sans-serif']
      }
    }
  }
}