import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  basePath: '/MAportfolio',
  assetPrefix: '/MAportfolio',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
      {
        protocol: 'https',
        hostname: 'opengraph.githubassets.com',
        port: '',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**', 
      },
    ],
  },
  transpilePackages: ['motion'],
};

export default nextConfig;
