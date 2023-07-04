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
  distDir: '../../build/web',
  experimental: {
    // Note: compile code from outside package
    externalDir: true,
  },
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
}

module.exports = [withBundleAnalyzer, withMDX].reduce((acc, next) => next(acc), configs)
