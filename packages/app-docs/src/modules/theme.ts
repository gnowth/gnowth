import { injectGlobal } from '@gnowth/lib-react'
import { themeStandard } from '@gnowth/theme-standard'

injectGlobal`
  ${themeStandard.global ?? ''}
`

export const theme = themeStandard
