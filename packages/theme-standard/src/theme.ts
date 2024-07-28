import '@fontsource/raleway/300.css'
import '@fontsource/raleway/400.css'
import '@fontsource/raleway/500.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import { Theme } from '@gnowth/lib-theme'

import { componentsNamespaced } from './components/components'
import * as medias from './medias'
import { palettes } from './palettes/palettes'
import { scales } from './scales/scales'
import { variables } from './variables'
import { variantsNamespaced } from './variants/variants'

export const themeStandard = new Theme({
  componentsNamespaced,
  medias,
  palettes,
  scales,
  variables,
  variantsNamespaced,
})
