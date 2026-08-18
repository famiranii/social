const nextConfig = {
  output: "standalone",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "195.181.41.139",
      },
    ],
  },
};

module.exports = nextConfig;