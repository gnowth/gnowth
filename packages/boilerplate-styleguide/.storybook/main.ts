import type { StorybookConfig } from '@storybook/core-common'

export const addons: StorybookConfig['addons'] = ['@gnowth/storybook-preset']

export const core: StorybookConfig['core'] = { builder: '@storybook/builder-webpack5' }

export const framework: StorybookConfig['framework'] = '@storybook/react'

export const stories: StorybookConfig['stories'] = ['../stories/**/*.stories.@(mdx|ts|tsx)']

// DEBT: store url in a config file?
export const refs = {
  storybook: {
    expanded: false,
    title: 'Storybook Design System',
    url: 'https://5ccbc373887ca40020446347-yldsqjoxzb.chromatic.com',
  },
}
