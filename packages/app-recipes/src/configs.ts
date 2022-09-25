import { defineConfig } from 'tinacms'

import { client } from './client'
import { schema } from './schema'

export const configs = defineConfig({
  client,
  schema,
})
