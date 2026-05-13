/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'c10.patreonusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
