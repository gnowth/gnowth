import { Theme } from '@gnowth/lib-theme'

import { componentsNamespaced } from './components/components'
import { global } from './global'
import * as medias from './medias'
import { palettes } from './palettes/palettes'
import { scales } from './scales/scales'
import { variables } from './variables'
import { variantsNamespaced } from './variants/variants'

export const themeStandard = new Theme({
  componentsNamespaced,
  global,
  medias,
  palettes,
  scales,
  variables,
  variantsNamespaced,
})
