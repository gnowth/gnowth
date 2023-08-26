import { TokenBreakpoint, TokenSpace, TokenVariable } from '@gnowth/lib-token'

import scaleBreakpoint from './scales/scale-breakpoint'
import scaleSpace from './scales/scale-space'

// TODO: move those variables into default exports
export const inputHeight = '' // could be in em, so that the ratio
export const headerHeight = '' // maybe pos
export const fontHeader = 'Raleway, Trebuchet MS, Avenir, Segoe UI, sans‑serif'
export const fontBody = 'Roboto, -apple-system, BlinkMacSystemFont, Tahoma, sans‑serif'
export const widthContent = '340px'
export const gridSpacing = scaleSpace(TokenSpace.md)
export const mobileBreakpoint = scaleBreakpoint(TokenBreakpoint.sm)

export default {
  [TokenVariable.fontBody]: 'Roboto, -apple-system, BlinkMacSystemFont, Tahoma, sans‑serif',
  [TokenVariable.fontHeader]: 'Raleway, Trebuchet MS, Avenir, Segoe UI, sans‑serif',
  [TokenVariable.widthContent]: '1140px',
}
