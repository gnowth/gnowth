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
  reactStrictMode: true,
  rewrites: async () => [
    {
      source: '/admin/netlify',
      destination: '/admin/netlify.html',
    },
  ],
}

module.exports = withMDX(configs)
