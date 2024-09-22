import { StorybookConfig } from '@storybook/nextjs'

export const addons: StorybookConfig['addons'] = [
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  '@storybook/addon-links',
]

export const framework: StorybookConfig['framework'] = '@storybook/nextjs'

export const previewAnnotations: StorybookConfig['previewAnnotations'] = (entry = []) => [
  ...entry,
  require.resolve('./default-preview'),
]

export const previewHead: StorybookConfig['previewHead'] = (head: string | undefined) => `
  ${head}
  <style>
    .sb-show-main.sb-main-centered #storybook-root {
      margin: 0;
      padding: 0;
      width: 100%;
    }
  </style>
`

export const refs: StorybookConfig['refs'] = {
  // DEBT: store url in a config file?
  storybook: {
    title: 'Storybook Design System',
    url: 'https://5ccbc373887ca40020446347-yldsqjoxzb.chromatic.com',
  },
}

export const stories: StorybookConfig['stories'] = [
  '../stories/**/*.stories.@(ts|tsx)',
  '../stories/**/*.mdx',
]

export const typescript: StorybookConfig['typescript'] = {
  check: false,
  // reactDocgen: 'react-docgen-typescript',
  // reactDocgenTypescriptOptions: {
  //   shouldExtractLiteralValuesFromEnum: true,
  //   propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
  // },
}
