import { defineConfig } from 'tinacms'

import { dependencies } from './dependencies'

export const schema = dependencies.modelTinaSchema.generate()
export const configs = defineConfig({
  branch: '',
  build: {
    outputFolder: 'admin/tina',
    publicFolder: '../boilerplate-nextjs/public',
  },
  clientId: '',
  schema,
  token: '',
})
