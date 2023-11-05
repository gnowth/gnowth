import type { Schema, Collection } from 'tinacms'
import { defineSchema } from 'tinacms'

interface RouteModel {
  recipes(context?: string, id?: string): string
}

interface Dependencies {
  routeModel: RouteModel
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
          fields: [
            {
              isBody: true,
              label: 'Main Content',
              name: 'body',
              type: 'rich-text',
            },
          ],
          format: 'mdx',
          label: CollectionEnum.Contents,
          name: CollectionEnum.Contents,
          path: `${CONTEXT_PATH}/${APP_CONTEXT}/${CollectionEnum.Contents}`,
          ui: { router: this.router },
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
          label: CollectionEnum.Ingredients,
          name: CollectionEnum.Ingredients,
          path: `${CONTEXT_PATH}/${APP_CONTEXT}/${CollectionEnum.Ingredients}`,
          ui: { router: this.router },
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
          label: CollectionEnum.Recipes,
          name: CollectionEnum.Recipes,
          path: `${CONTEXT_PATH}/${APP_CONTEXT}/${CollectionEnum.Recipes}`,
          ui: { router: this.router },
        },
      ],
    })
  }

  getFormatFromSchema(schema: Schema, collectionName: CollectionEnum): NonNullable<Collection['format']> {
    const collection = schema.collections.find((collection) => collection.name === collectionName)

    return collection?.format ?? 'json'
  }

  private router: NonNullable<Collection['ui']>['router'] = (configs) => {
    return this.dependencies.routeModel.recipes(
      configs.collection.name === CollectionEnum.Contents ? undefined : configs.collection.name,
      configs.document._sys.filename,
    )
  }
}
