/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "pbs.twimg.com",
      "devemyhg.lycee-darchicourt.net",
      "https://github.com/",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
