import { Theme } from '@gnowth/lib-theme'
import { ComponentType, ReactElement } from 'react'

import { useAppTheme } from './use-app-theme'

type WithTheme = {
  theme: Theme
}

export function withAppTheme<Props>(Component: ComponentType<Props & WithTheme>) {
  return function ComponentWithTheme(props: Props): ReactElement {
    const theme = useAppTheme()

    return <Component theme={theme} {...props} />
  }
}
