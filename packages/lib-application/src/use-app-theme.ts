import { Theme } from '@gnowth/lib-theme'
import { useContext } from 'react'
import * as R from 'remeda'

import { ContextApplication } from './context-application'
import { ContextEnvironment } from './context-environment'

const defaultTheme = new Theme({})

export function useAppTheme(theme?: string | Theme): Theme {
  const contextApplication = useContext(ContextApplication)
  const contextEnvironment = useContext(ContextEnvironment)
  const themeOrName = theme || contextApplication.theme
  const maybeTheme = R.isString(themeOrName) ? contextEnvironment.themes[themeOrName] : themeOrName

  return maybeTheme || defaultTheme
}
