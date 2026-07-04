export default function manifest() {
  return {
    name: 'Focus App',
    short_name: 'Focus',
    description: 'Privacy-First Offline Mood Tracker & Stoic Journal',
    start_url: '/',
    display: 'standalone',
    background_color: '#121212',
    theme_color: '#FC6E20',
    icons: [
      {
        src: '/favicon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}
