import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

module.exports = {
  allowedDevOrigins: ['192.168.100.8'],
  images: {
    remotePatterns: [new URL('https://m.media-amazon.com/images/I/**')],
  },
}
export default nextConfig;
