import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Drumil Nikhare - Full Stack Developer',
    short_name: 'Drumil Portfolio',
    description: 'Full-Stack Developer passionate about creating beautiful, functional, and user-centered digital experiences.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/av2.jpeg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/av2.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  }
}