import { injectGlobal } from '@gnowth/lib-react'
import { themeStandard } from '@gnowth/theme-standard'

// eslint-disable-next-line @typescript-eslint/no-unused-expressions
injectGlobal`
  * {
    margin: 0;
  }

  button {
    font-size: 1rem;
  }
`

export const theme = themeStandard
