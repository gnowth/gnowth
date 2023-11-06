import type { Schema, Collection } from 'tinacms'
import { defineSchema } from 'tinacms'

type Parameters = { routeModel: RouteModel }
type RouteModel = {
  recipes(context?: string, id?: string): string
}

export enum CollectionEnum {
  contents = 'contents',
  ingredients = 'ingredients',
  recipes = 'recipes',
}

// DEBT: current can move the content to the root as tina is not dealing well with relative path that are above the root
// Note: any path are relative to root of this package
const APP_CONTEXT = 'recipes'
const CONTEXT_PATH = 'contents'

export class SchemaService {
  #parameters: Parameters
  #routeModel: RouteModel

  constructor(parameters: Parameters) {
    this.#parameters = parameters
    this.#routeModel = parameters.routeModel
  }

  formatGet(schema: Schema, collectionName: CollectionEnum): NonNullable<Collection['format']> {
    const collection = schema.collections.find((collection) => collection.name === collectionName)

    return collection?.format ?? 'json'
  }

  generate(): Schema {
    return defineSchema({
      collections: [
        {
          fields: [
            {
              isBody: true,
              label: 'Main Content',
              name: 'body',
              type: 'rich-text',
            },
          ],
          format: 'mdx',
          label: CollectionEnum.contents,
          name: CollectionEnum.contents,
          path: `${CONTEXT_PATH}/${APP_CONTEXT}/${CollectionEnum.contents}`,
          ui: { router: this.#router },
        },

        {
          fields: [
            {
              isBody: true,
              label: 'Main Content',
              name: 'body',
              type: 'rich-text',
            },
          ],
          format: 'mdx',
          label: CollectionEnum.ingredients,
          name: CollectionEnum.ingredients,
          path: `${CONTEXT_PATH}/${APP_CONTEXT}/${CollectionEnum.ingredients}`,
          ui: { router: this.#router },
        },

        {
          fields: [
            {
              label: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              label: 'Description',
              name: 'description',
              type: 'string',
              ui: {
                component: 'textarea',
              },
            },
            {
              isBody: true,
              label: 'Main Content',
              name: 'body',
              type: 'rich-text',
            },
          ],
          format: 'mdx',
          label: CollectionEnum.recipes,
          name: CollectionEnum.recipes,
          path: `${CONTEXT_PATH}/${APP_CONTEXT}/${CollectionEnum.recipes}`,
          ui: { router: this.#router },
        },
      ],
    })
  }

  #router: NonNullable<Collection['ui']>['router'] = (configs) => {
    return this.#routeModel.recipes(
      configs.collection.name === CollectionEnum.contents ? undefined : configs.collection.name,
      configs.document._sys.filename,
    )
  }
}
