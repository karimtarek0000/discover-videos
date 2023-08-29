/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  reactStrictMode: false,
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com", "yt3.ggpht.com", "img.youtube.com"],
  },
};

module.exports = nextConfig;
