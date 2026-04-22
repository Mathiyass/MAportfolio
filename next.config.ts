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
    ],
  },
  output: 'export',
  transpilePackages: ['motion'],
};

export default nextConfig;
