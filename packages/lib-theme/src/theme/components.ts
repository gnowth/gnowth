import type { ObjectLiteral, UtilNamespaced } from '@gnowth/lib-utils'
import type { ComponentType } from 'react'

import { objectDefaults } from '@gnowth/lib-utils'
import * as R from 'remeda'

import { namespacedMerge } from '../utils/namespace-merge'

type ComponentName = string
type ComponentNamespace = string // TODO: allow array as namespace
type Components<Props extends ObjectLiteral = ObjectLiteral> = UtilNamespaced<
  ComponentType<Props>,
  ComponentName
>
type ComponentsNamespaced = UtilNamespaced<Components, ComponentNamespace>
type Configs = { componentsNamespaced?: ComponentsNamespaced }

export type ConfigsComponent<Props extends ObjectLiteral> = {
  component?: ComponentName | ComponentType<Props>
  componentNamespace?: ComponentNamespace // default: 'type'
  components?: Components<Props>
}

export class ComponentManager {
  #componentsNamespaced: ComponentsNamespaced = {}

  constructor(configs?: Configs) {
    this.#componentsNamespaced = configs?.componentsNamespaced ?? {}
  }

  #getComponentsByNamespace<Props extends ObjectLiteral>(namespace = 'type'): Components<Props> {
    return (this.#componentsNamespaced[namespace] ?? {}) as Components<Props>
  }

  configsMerge(...configs: Configs[]): Configs {
    return { componentsNamespaced: namespacedMerge(configs.map((config) => config.componentsNamespaced)) }
  }

  // TODO: allow multiple configs which will be used as fallback or allow multiple component name
  get<Props extends ObjectLiteral>(configs: ConfigsComponent<Props>): ComponentType<Props> | undefined {
    if (!configs.component) {
      return undefined
    }

    if (!R.isString(configs.component)) {
      return configs.component
    }

    const components = objectDefaults(
      configs.components ?? {},
      this.#getComponentsByNamespace(configs.componentNamespace),
    )

    return components[configs.component]
  }
}
