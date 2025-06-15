/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/context",
        destination: "http://localhost:3001/api/context",
      },
    ];
  },
};

module.exports = nextConfig;
