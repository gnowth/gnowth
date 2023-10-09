import { Theme } from '@gnowth/lib-theme'
import { useContext } from 'react'
import { guardString } from '@gnowth/lib-utils'

import { ContextApplication } from './context-application'
import { ContextEnvironment } from './context-environment'

const defaultTheme = new Theme({})

export function useAppTheme(theme?: Theme | string): Theme {
  const contextApplication = useContext(ContextApplication)
  const contextEnvironment = useContext(ContextEnvironment)
  const themeOrName = theme || contextApplication.theme
  const maybeTheme = guardString(themeOrName) ? contextEnvironment.themes[themeOrName] : themeOrName

  return maybeTheme || defaultTheme
}
