/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["media1.giphy.com", "coverartarchive.org", "media0.giphy.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      }
    ],
  },
};

module.exports = nextConfig;
