import { ThemeVariable } from '@gnowth/lib-theme'

import { breakpoint } from './scales/scale-breakpoint'
import { space } from './scales/scale-space'

// TODO: move those variables into default exports
export const inputHeight = '' // could be in em, so that the ratio
export const headerHeight = '' // maybe pos
export const fontHeader = 'Raleway, Trebuchet MS, Avenir, Segoe UI, sans‑serif'
export const fontBody = 'Roboto, -apple-system, BlinkMacSystemFont, Tahoma, sans‑serif'
export const widthContent = '340px'
export const gridGap = space.md
export const mobileBreakpoint = breakpoint.sm

export const variables = {
  [ThemeVariable.breakpointToken]: 'breakpoint',
  [ThemeVariable.fontBody]: 'Roboto, -apple-system, BlinkMacSystemFont, Tahoma, sans‑serif',
  [ThemeVariable.fontHeader]: 'Raleway, Trebuchet MS, Avenir, Segoe UI, sans‑serif',
  [ThemeVariable.widthContent]: '1152px',
}
