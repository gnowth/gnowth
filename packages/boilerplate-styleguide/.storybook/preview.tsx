import { Preview } from '@storybook/react'

import { theme } from '../src/theme'

export const parameters: Preview['parameters'] = {
  // Note: needed due to a bug in chakra addon where theme is not defined
  // https://github.com/chakra-ui/chakra-ui/blob/4e2df65d03d3ac236371e9dc6430902b5b7a3465/tooling/storybook-addon/src/ChakraProviderDecorator.tsx#L17
  chakra: { theme: {} },
  libReact: { theme },
  options: {
    storySort: {
      order: ['Welcome', 'AppUsers'],
    },
  },
}
