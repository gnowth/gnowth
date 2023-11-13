import type { Schema } from 'tinacms'
import { Service } from '@gnowth/lib-react'
import { RouteModel } from '@gnowth/logic-core'

import { client } from './tina.clients'
import { CollectionEnum, SchemaService } from './schema'

export class TinaService extends Service {
  #schemaService = new SchemaService({ routeModel: new RouteModel() })
  #schema = this.#schemaService.generate()
  #tinaClient = client

  get schema(): Schema {
    return this.#schema
  }

  async contentGetContent(slug: string) {
    const format = this.#schemaService.formatGet(this.#schema, CollectionEnum.contents)

    return this.#tinaClient.queries.contents({ relativePath: `${slug}.${format}` })
  }

  async contentGetSlugs(): Promise<string[]> {
    const connection = await this.#tinaClient.queries.contentsConnection()
    const edges = connection.data.contentsConnection.edges ?? []

    return edges.map((edge) => edge?.node?._sys.filename ?? '').filter((slug): slug is string => !!slug)
  }

  async ingredientGetContent(slug: string) {
    const format = this.#schemaService.formatGet(this.#schema, CollectionEnum.ingredients)

    return this.#tinaClient.queries.ingredients({ relativePath: `${slug}.${format}` })
  }

  async ingredientGetSlugs(): Promise<string[]> {
    const connection = await this.#tinaClient.queries.ingredientsConnection()
    const edges = connection.data.ingredientsConnection.edges ?? []

    return edges.map((edge) => edge?.node?._sys.filename ?? '').filter((slug): slug is string => !!slug)
  }

  async recipeGetContent(slug: string) {
    const format = this.#schemaService.formatGet(this.#schema, CollectionEnum.recipes)

    return this.#tinaClient.queries.recipes({ relativePath: `${slug}.${format}` })
  }

  async recipeGetSlugs(): Promise<string[]> {
    const connection = await this.#tinaClient.queries.recipesConnection()
    const edges = connection.data.recipesConnection.edges ?? []

    return edges.map((edge) => edge?.node?._sys.filename ?? '').filter((slug): slug is string => !!slug)
  }
}
