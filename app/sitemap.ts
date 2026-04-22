import type { MetadataRoute } from 'next';

const BASE_URL = 'https://mathiya.github.io/MAportfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/projects',
    '/skills',
    '/contact',
    '/games',
    '/blog',
    '/gallery',
    '/ar',
    '/marketplace',
    '/resume',
    '/lab',
    '/now',
    '/uses',
    '/certifications',
    '/timeline',
    '/open-source',
    '/sri-lanka',
    '/colophon',
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/projects' ? 0.9 : 0.7,
  }));
}
