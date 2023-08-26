import { Theme } from '@gnowth/lib-theme'
import { layouts as layout } from '@gnowth/lib-view'

import * as boundary from './namespace-boundary'
import * as icon from './namespace-icon'
import * as input from './namespace-input'
import * as suspense from './namespace-suspense'
import * as type from './namespace-type'

export default Theme.assembleComponents({
  boundary,
  icon,
  input,
  layout,
  suspense,
  type,
})
