/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const bundleAnalyzer = require('@next/bundle-analyzer')
const mdx = require('@next/mdx')
/* eslint-enable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */

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
  distDir: '../../artifact/build-web',
  experimental: {
    // Note: compile code from outside package
    externalDir: true,
  },
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  webpack: (config, { nextRuntime }) => {
    if (typeof nextRuntime === 'undefined') {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

module.exports = [withBundleAnalyzer, withMDX].reduce((acc, next) => next(acc), configs)
