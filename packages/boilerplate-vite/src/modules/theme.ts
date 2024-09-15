import { injectGlobal } from '@gnowth/lib-react'
import { themeStandard } from '@gnowth/theme-standard'

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
injectGlobal`
  ${themeStandard.global ?? ''}
`

export const theme = themeStandard
