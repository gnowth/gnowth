// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })

module.exports = withMDX({
  images: {
    loader: 'imgix',
    path: '',
  },
  pageExtensions: ['tsx', 'mdx'],
  reactStrictMode: true,
})
