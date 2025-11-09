import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GRM Robotics - Student-Friendly Robotics Kits',
    short_name: 'GRM Robotics',
    description: 'Build, learn, and innovate with LEGO-style robotics kits. Complete with video tutorials and user manuals.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0ea5e9',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['education', 'shopping', 'technology'],
    lang: 'en',
    orientation: 'portrait-primary',
  };
}