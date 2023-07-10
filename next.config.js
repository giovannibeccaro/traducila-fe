/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/df3d1u5uz/image/upload/**",
      },
      {
        protocol: "https",
        hostname: "images.genius.com",
      },
    ],
  },
};

module.exports = nextConfig;
