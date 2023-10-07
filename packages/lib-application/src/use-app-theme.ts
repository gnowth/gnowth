import type { Theme } from '@gnowth/lib-types'
import { useContext } from 'react'
import { guardString } from '@gnowth/lib-utils'

import { ContextApplication } from './context-application'
import { ContextEnvironment } from './context-environment'
import { shimmedTheme } from './shimmed-theme'

export function useAppTheme(theme?: Theme | string): Theme {
  const contextApplication = useContext(ContextApplication)
  const contextEnvironment = useContext(ContextEnvironment)
  const themeOrName = theme || contextApplication.theme
  const maybeTheme = guardString(themeOrName) ? contextEnvironment.themes[themeOrName] : themeOrName

  return maybeTheme || shimmedTheme
}
