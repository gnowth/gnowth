import type { ComponentType } from 'react'

import { TokenComponentNamespace } from '@gnowth/lib-application'
import { layouts } from '@gnowth/lib-view'

import * as boundary from './namespace-boundary'
import * as icon from './namespace-icon'
import * as input from './namespace-input'
import * as suspense from './namespace-suspense'
import * as type from './namespace-type'

export const componentsNamespaced = {
  [TokenComponentNamespace.boundary]: boundary,
  [TokenComponentNamespace.icon]: icon,
  [TokenComponentNamespace.input]: input,
  [TokenComponentNamespace.layout]: layouts as unknown as Record<string, ComponentType>,
  [TokenComponentNamespace.suspense]: suspense,
  [TokenComponentNamespace.type]: type,
}
