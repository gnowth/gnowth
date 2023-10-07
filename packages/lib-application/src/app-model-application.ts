import type { Model, QueryResource } from '@gnowth/lib-types'
import { guardString } from '@gnowth/lib-utils'

interface ConfigsApplication {
  route?: string
}

interface ParamsRoute {
  pageId?: string
}

type MakeResource = (paramsRoute: ParamsRoute) => Record<string, QueryResource | undefined>

export class AppModelApplication<Configs extends ConfigsApplication = ConfigsApplication> {
  configs: Configs

  models: Record<string, Model | undefined> = {}

  resources: Record<string, (paramsRoute: ParamsRoute) => unknown | undefined> = {}

  route: string

  routes: Record<string, (() => string) | undefined> = {}

  constructor(configs: Configs) {
    this.configs = configs
    this.route = configs.route || '/'
  }

  getModel(model?: Model | string): Model | undefined {
    if (!guardString(model)) return model

    return this.models[model]
  }

  getResources(page?: string): MakeResource {
    if (!page) return () => ({})

    return (this.resources[page] as MakeResource) || (() => ({}))
  }

  getRoute(page?: string): string | undefined {
    if (!page) return this.route

    return this.routes[page]?.()
  }
}
