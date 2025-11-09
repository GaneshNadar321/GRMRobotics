import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grmrobotics.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/profile/',
          '/orders/',
          '/cart/',
          '/checkout/',
          '/login/',
          '/register/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}