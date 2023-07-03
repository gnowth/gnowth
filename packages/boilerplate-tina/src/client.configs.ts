import { defineConfig } from 'tinacms'

import { dependencies } from './dependencies'

export const schema = dependencies.modelTinaSchema.generate()
export const configs = defineConfig({
  branch: '',
  clientId: '',
  token: '',
  build: {
    // publicFolder: '../../build/web',
    publicFolder: '../boilerplate-nextjs/public',
    outputFolder: 'admin/tina',
  },
  schema,
})
