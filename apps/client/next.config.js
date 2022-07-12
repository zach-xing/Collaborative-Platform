const semi = require('@douyinfe/semi-next').default({});

/** @type {import('next').NextConfig} */
const nextConfig = semi({
  // your custom Next.js configuration
  reactStrictMode: false,
});

module.exports = nextConfig;