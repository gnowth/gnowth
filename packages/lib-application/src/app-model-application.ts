import { Model } from '@gnowth/lib-model'
import * as R from 'remeda'

import { QueryResource } from './queries/query-resource'

type ConfigsApplication = {
  route?: string
}

type MakeResource = (paramsRoute: ParamsRoute) => Record<string, QueryResource | undefined>

type ParamsRoute = {
  pageId?: string
}

export class AppModelApplication<Configs extends ConfigsApplication = ConfigsApplication> {
  configs: Configs

  models: Record<string, Model | undefined> = {}

  resources: Record<string, (paramsRoute: ParamsRoute) => unknown> = {}

  route: string

  routes: Record<string, (() => string) | undefined> = {}

  constructor(configs: Configs) {
    this.configs = configs
    this.route = configs.route ?? '/'
  }

  getModel(model?: Model | string): Model | undefined {
    if (!R.isString(model)) return model

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
