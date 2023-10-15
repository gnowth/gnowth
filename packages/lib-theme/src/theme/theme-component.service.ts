import type { ObjectLiteral, UtilNamespaced } from '@gnowth/lib-utils'
import type { ComponentType } from 'react'
import { guardString, objectDefaults } from '@gnowth/lib-utils'

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
  component?: ComponentType<Props> | ComponentName
  componentNamespace?: ComponentNamespace // default: 'type'
  components?: Components<Props>
}

export class ServiceThemeComponent {
  #componentsNamespaced: ComponentsNamespaced = {}

  constructor(configs?: Configs) {
    this.#componentsNamespaced = configs?.componentsNamespaced ?? {}
  }

  configsMerge(...configs: Configs[]): Configs {
    return { componentsNamespaced: namespacedMerge(configs.map((config) => config.componentsNamespaced)) }
  }

  // TODO: allow multiple configs which will be used as fallback or allow multiple component name
  getComponent<Props extends ObjectLiteral>(configs: ConfigsComponent<Props>): ComponentType<Props> | null {
    if (!configs.component) {
      return null
    }

    if (!guardString(configs.component)) {
      return configs.component
    }

    const components = objectDefaults(
      configs.components ?? {},
      this.#getComponentsByNamespace(configs.componentNamespace),
    )

    return components[configs.component] ?? null
  }

  #getComponentsByNamespace<Props extends ObjectLiteral>(namespace = 'type'): Components<Props> {
    return (this.#componentsNamespaced[namespace] ?? {}) as Components<Props>
  }
}
