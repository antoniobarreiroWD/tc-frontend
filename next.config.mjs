/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'es.nycgo.com' },
      { protocol: 'https', hostname: 'www.wazwu.com' },
      { protocol: 'https', hostname: 'resizer.otstatic.com' },
      { protocol: 'https', hostname: 'i.pinimg.com' },
      { protocol: 'https', hostname: 'video-images.vice.com' },
      { protocol: 'https', hostname: 'media-cdn.tripadvisor.com' },
      { protocol: 'https', hostname: 'www.livingfla.com' },
      { protocol: 'https', hostname: 'c8.alamy.com' }
    ],
  },
};

export default nextConfig;
