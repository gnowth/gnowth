import type { Preview } from '@storybook/react'

import { setup } from './setup'

const configurations = setup()

export const parameters: Preview['parameters'] = {
  // Note: needed due to a bug in chakra addon where theme is not defined
  // https://github.com/chakra-ui/chakra-ui/blob/4e2df65d03d3ac236371e9dc6430902b5b7a3465/tooling/storybook-addon/src/ChakraProviderDecorator.tsx#L17
  chakra: { theme: {} },
  i18n: configurations.i18n,
  reactQuery: { client: configurations.queryClient },
  options: {
    storySort: {
      order: ['Welcome', 'AppUsers'],
    },
  },
}
