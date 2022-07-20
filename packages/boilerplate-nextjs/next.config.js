const bundleAnalyzer = require('@next/bundle-analyzer')
const mdx = require('@next/mdx')
const withPlugins = require('next-compose-plugins')

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })
const withMDX = mdx({ extension: /\.mdx?$/ })

/**
 * @type {import('next').NextConfig}
 */
const configs = {
  images: {
    loader: 'imgix',
    path: '',
  },
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/admin/netlify',
      destination: '/admin/netlify.html',
    },
  ],
}

module.exports = withPlugins([[withMDX], [withBundleAnalyzer]], configs)
