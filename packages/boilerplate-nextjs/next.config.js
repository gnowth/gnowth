const bundleAnalyzer = require('@next/bundle-analyzer')
const mdx = require('@next/mdx')

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })
const withMDX = mdx({ extension: /\.mdx?$/ })

/**
 * @type {import('next').NextConfig}
 */
const configs = {
  compiler: {
    emotion: {
      autoLabel: 'never',
    },
  },
  experimental: {
    appDir: true,
    externalDir: true,
  },
  exportPathMap: (defaultPathMap) => defaultPathMap,
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/admin/netlify',
      destination: '/admin/netlify.html',
    },
  ],
  swcMinify: true,
}

module.exports = [withBundleAnalyzer, withMDX].reduce((acc, next) => next(acc), configs)
