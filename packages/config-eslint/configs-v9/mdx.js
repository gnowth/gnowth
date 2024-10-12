import * as mdx from 'eslint-plugin-mdx'

export const mdxConfigs = [
  { files: ['*.mdx'], ...mdx.flat },
  { files: ['*.mdx'], ...mdx.flatCodeBlocks },
]
