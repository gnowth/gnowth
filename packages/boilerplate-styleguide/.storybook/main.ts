import { StorybookConfig } from '@storybook/nextjs'

export const addons: StorybookConfig['addons'] = ['@gnowth/storybook-preset']

export const framework: StorybookConfig['framework'] = '@storybook/nextjs'

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
