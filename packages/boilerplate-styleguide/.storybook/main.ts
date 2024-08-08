import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  addons: ['@gnowth/storybook-preset'],
  framework: '@storybook/nextjs',
  refs: {
    // DEBT: store url in a config file?
    storybook: {
      title: 'Storybook Design System',
      url: 'https://5ccbc373887ca40020446347-yldsqjoxzb.chromatic.com',
    },
  },
  stories: ['../stories/**/*.stories.@(mdx|ts|tsx)'],
}

export default config
