import { Preview } from '@storybook/react'

export const parameters: Preview['parameters'] = {
  options: {
    storySort: {
      order: ['Welcome', 'AppUsers'],
    },
  },
}
