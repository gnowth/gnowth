import type { Theme } from '@gnowth/lib-types'
import _ from 'lodash'
import { useContext } from 'react'

import { ContextApplication } from './context-application'
import { ContextEnvironment } from './context-environment'
import shimmedTheme from './shimmed-theme'

export function useAppTheme(theme?: Theme | string): Theme {
  const contextApplication = useContext(ContextApplication)
  const contextEnvironment = useContext(ContextEnvironment)
  const themeOrName = theme || contextApplication.theme
  const maybeTheme = _.isString(themeOrName) ? contextEnvironment.themes[themeOrName] : themeOrName

  return maybeTheme || shimmedTheme
}
