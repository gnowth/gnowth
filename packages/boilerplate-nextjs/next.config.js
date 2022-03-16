const mdx = require('@next/mdx')

const withMDX = mdx({ extension: /\.mdx?$/ })

/**
 * @type {import('next').NextConfig}
 */
const configs = {
  experimental: {
    reactRoot: true,
  },
  images: {
    loader: 'imgix',
    path: '',
  },
  reactStrictMode: true,
}

module.exports = withMDX(configs)
