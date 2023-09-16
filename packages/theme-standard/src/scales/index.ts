import { Theme } from '@gnowth/lib-theme'

import { breakpoint } from './scale-breakpoint'
import { fontsize } from './scale-fontsize'
import { iconsize } from './scale-iconsize'
import { length } from './scale-length'
import { space } from './scale-space'
import { zindex } from './scale-zindex'

export const scales = Theme.assembleScales({
  breakpoint,
  fontsize,
  iconsize,
  length,
  space,
  zindex,
})
