import { themeStandard } from '@gnowth/theme-standard'
import { injectGlobal } from '@gnowth/lib-react'

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
