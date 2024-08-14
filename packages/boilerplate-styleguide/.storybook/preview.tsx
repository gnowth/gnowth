import type { Preview } from '@storybook/react'

import { setup } from './setup'

const configurations = setup()

export const parameters: Preview['parameters'] = {
  i18n: configurations.i18n,
  reactQuery: { client: configurations.queryClient },
  options: {
    storySort: {
      order: ['Welcome', 'AppUsers'],
    },
  },
}
