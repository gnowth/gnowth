import { setup } from '@app/core'
import React from 'react'

const configurations = setup()

export const parameters = {
  i18n: configurations.i18n,
  reactQuery: { client: configurations.queryClient },
  options: {
    storySort: {
      order: ['Welcome', 'AppUsers'],
    },
  },
}
