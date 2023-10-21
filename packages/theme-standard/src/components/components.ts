import type { ComponentType } from 'react'
import { layouts } from '@gnowth/lib-view'

import * as boundary from './namespace-boundary'
import * as icon from './namespace-icon'
import * as input from './namespace-input'
import * as suspense from './namespace-suspense'
import * as type from './namespace-type'

export const componentsNamespaced = {
  boundary,
  icon,
  input,
  layout: layouts as unknown as Record<string, ComponentType>,
  suspense,
  type,
}
