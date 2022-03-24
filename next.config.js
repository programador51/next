/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "pbs.twimg.com",
      "devemyhg.lycee-darchicourt.net",
      "https://github.com/",
    ],
  },
};

module.exports = nextConfig;
