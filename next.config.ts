/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "195.181.41.139",
        pathname: "/api/images/**",
      },
    ],
  },
};

module.exports = nextConfig;