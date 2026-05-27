import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    // 💡 Cette ligne suffit à scanner ABSOLUMENT TOUT ce qui se trouve dans ton dossier app/
    './app/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        footer: '#fbf9f4', 
        navbar: '#fefcf8',
        backgroundPrimary: '#fdfcf7',
        buttonPrimary: '#00be62',
        buttonSecondary: '#ffde58',
        textPrimary: '#1a2b3b',
        textSecondary: '#ffffff',
        buttonPrimaryDegrade1: '#50cc7e',
        buttonSecondayDegrade2: '#00be62', // Attention à la petite faute de frappe sur "Seconday", laisse-la ainsi si tu l'as écrite comme ça dans tes composants !
        buttonSecondaryDegrade1: '#ffde58',
        buttonPrimaryDegrade2: '#faf7cd',
        textVert: '#00be62',
        degrade1: '#dffae4',
        degrade2: '#fff6c8',
        degrade3: '#edf8d9',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Roboto Condensed', 'sans-serif']
      }
    }
  }
}