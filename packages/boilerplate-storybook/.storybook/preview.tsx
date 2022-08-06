import { setup as runSetup } from '@boilerplate/nextjs'
import React from 'react'

const setup = runSetup()

export const parameters = {
  i18n: setup.i18n,
  reactQuery: { client: setup.queryClient },
  options: {
    storySort: {
      order: ['Welcome', 'NextJS'],
    },
  },
}
