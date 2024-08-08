import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  addons: [
    '@chakra-ui/storybook-addon',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    'storybook-react-i18next',
  ],
  config: (entry = []) => {
    return [...entry, require.resolve('./default-preview')]
  },
  framework: '@storybook/nextjs',
  previewHead: (head: string) => {
    return `
    ${head}

    <style>
      .sb-show-main.sb-main-centered #storybook-root {
        margin: 0;
        padding: 0;
        width: 100%;
      }
    </style>
  `
  },
  refs: {
    // DEBT: store url in a config file?
    storybook: {
      title: 'Storybook Design System',
      url: 'https://5ccbc373887ca40020446347-yldsqjoxzb.chromatic.com',
    },
  },
  stories: ['../stories/**/*.stories.@(mdx|ts|tsx)'],
  typescript: {
    check: false,
    // reactDocgen: 'react-docgen-typescript',
    // reactDocgenTypescriptOptions: {
    //   shouldExtractLiteralValuesFromEnum: true,
    //   propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    // },
  },
}

// eslint-disable-next-line import/no-default-export
export default config
