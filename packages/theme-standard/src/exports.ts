import '@fontsource/raleway/300.css'
import '@fontsource/raleway/400.css'
import '@fontsource/raleway/500.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import { Theme } from '@gnowth/lib-theme'

import * as images from './images'
import components from './components'
import palettes from './palettes'
import scales from './scales'
import variables from './variables'
import variants from './variants'

export default new Theme({
  components,
  images,
  palettes,
  scales,
  variables,
  variants,
})
