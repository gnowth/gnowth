const mdx = require('@next/mdx')

const withMDX = mdx({ extension: /\.mdx?$/ })

/**
 * @type {import('next').NextConfig}
 */
const configs = {
  images: {
    loader: 'imgix',
    path: '',
  },
  pageExtensions: ['tsx', 'mdx'],
  reactStrictMode: true,
}

module.exports = withMDX(configs)
