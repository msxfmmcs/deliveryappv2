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
    domains: ["res.cloudinary.com"],
  },
  env: {
    TOKEN_MAPBOX: process.env.TOKEN_MAPBOX,
    URL: process.env.URL,
  },
};

module.exports = nextConfig;
