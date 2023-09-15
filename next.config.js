/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        //port: '',
        //pathname: '/account123/**',
      },
    ],
  },
  env: {
    TOKEN_MAPBOX: process.env.TOKEN_MAPBOX,
  },
};

module.exports = nextConfig;
