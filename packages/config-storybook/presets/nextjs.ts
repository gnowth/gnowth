import type { StorybookConfig } from '@storybook/core-common'

export const addons: StorybookConfig['addons'] = [
  '@chakra-ui/storybook-addon',
  '@storybook/addon-essentials',
  '@storybook/addon-interactions',
  '@storybook/addon-links',
  'storybook-addon-next',
  'storybook-react-i18next',
]

export function config(entry = []) {
  return [...entry, require.resolve('./default-preview')]
}

export const features: StorybookConfig['features'] = {
  emotionAlias: false,
  previewMdx2: true,
  storyStoreV7: true,
}

export function previewHead(head: string) {
  return `
    ${head}

    <style>
      .sb-show-main.sb-main-centered #root {
        margin: 0;
        padding: 0;
        width: 100%;
      }
    </style>
  `
}

export const typescript: StorybookConfig['typescript'] = {
  check: false,
  // reactDocgen: 'react-docgen-typescript',
  // reactDocgenTypescriptOptions: {
  //   shouldExtractLiteralValuesFromEnum: true,
  //   propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
  // },
}
