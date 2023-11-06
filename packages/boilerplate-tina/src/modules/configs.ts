import { defineConfig } from 'tinacms'

import { TinaService } from './tina.services'

const tinaService = new TinaService()

export const configs = defineConfig({
  branch: '',
  build: {
    outputFolder: 'admin/tina',
    publicFolder: '../boilerplate-nextjs/public',
  },
  clientId: '',
  schema: tinaService.schema,
  token: '',
})
