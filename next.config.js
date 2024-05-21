/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */

// Remove this if you're not using Fullcalendar features

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: false,
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision'),
    };

    return config;
  },
};

module.exports = withPWA(nextConfig);
