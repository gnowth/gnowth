import type { Schema, Collection } from 'tinacms'
import { defineSchema } from 'tinacms'

interface ModelRoute {
  recipes(context?: string, id?: string): string
}

interface Dependencies {
  modelRoute: ModelRoute
}

interface OptionsModelSchema {
  dependencies: Dependencies
}

export enum CollectionEnum {
  Contents = 'contents',
  Ingredients = 'ingredients',
  Recipes = 'recipes',
}

// DEBT: current can move the content to the root as tina is not dealing well with relative path that are above the root
// Note: any path are relative to root of this package
const APP_CONTEXT = 'recipes'
const CONTEXT_PATH = 'contents'

export class ModelTinaSchema {
  private dependencies: Dependencies
  private options: OptionsModelSchema

  constructor(options: OptionsModelSchema) {
    this.dependencies = options.dependencies
    this.options = options
  }

  generate(): Schema {
    return defineSchema({
      collections: [
        {
          format: 'mdx',
          label: CollectionEnum.Contents,
          name: CollectionEnum.Contents,
          path: `${CONTEXT_PATH}/${APP_CONTEXT}/${CollectionEnum.Contents}`,
          ui: { router: this.router },
          fields: [
            {
              name: 'body',
              label: 'Main Content',
              type: 'rich-text',
              isBody: true,
            },
          ],
        },

        {
          format: 'mdx',
          label: CollectionEnum.Ingredients,
          name: CollectionEnum.Ingredients,
          path: `${CONTEXT_PATH}/${APP_CONTEXT}/${CollectionEnum.Ingredients}`,
          ui: { router: this.router },
          fields: [
            {
              name: 'body',
              label: 'Main Content',
              type: 'rich-text',
              isBody: true,
            },
          ],
        },

        {
          format: 'mdx',
          label: CollectionEnum.Recipes,
          name: CollectionEnum.Recipes,
          path: `${CONTEXT_PATH}/${APP_CONTEXT}/${CollectionEnum.Recipes}`,
          ui: { router: this.router },
          fields: [
            {
              type: 'string',
              label: 'Title',
              name: 'title',
            },
            {
              type: 'string',
              label: 'Description',
              name: 'description',
              ui: {
                component: 'textarea',
              },
            },
            {
              name: 'body',
              label: 'Main Content',
              type: 'rich-text',
              isBody: true,
            },
          ],
        },
      ],
    })
  }

  getFormatFromSchema(schema: Schema, collectionName: CollectionEnum): NonNullable<Collection['format']> {
    const collection = schema.collections.find((collection) => collection.name === collectionName)

    return collection?.format ?? 'json'
  }

  private router: NonNullable<Collection['ui']>['router'] = (configs) => {
    return this.dependencies.modelRoute.recipes(
      configs.collection.name === CollectionEnum.Contents ? undefined : configs.collection.name,
      configs.document._sys.filename,
    )
  }
}
