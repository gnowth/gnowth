import type { Theme } from '@gnowth/lib-types'
import type { ComponentType, ReactElement } from 'react'
import React from 'react'

import { useAppTheme } from './use-app-theme'

interface WithTheme {
  theme: Theme
}

export function withAppTheme<Props>(Component: ComponentType<Props & WithTheme>) {
  return function ComponentWithTheme(props: Props): ReactElement {
    const theme = useAppTheme()

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component theme={theme} {...props} />
  }
}
