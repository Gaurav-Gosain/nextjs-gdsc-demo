/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["googleusercontent.com"],
  },
};

module.exports = nextConfig;
