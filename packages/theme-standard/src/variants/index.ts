import { Theme } from '@gnowth/lib-theme'

import * as inputText from './input-text'
import * as layoutSection from './layout-section'
import * as systemBox from './system-box'
import * as uiButton from './ui-button'
import * as uiDivider from './ui-divider'
import * as uiProgress from './ui-progress'
import * as uiTypography from './ui-typography'

export default Theme.assembleVariants({
  inputText,
  layoutSection,
  systemBox,
  uiButton,
  uiDivider,
  uiProgress,
  uiTypography,
})
