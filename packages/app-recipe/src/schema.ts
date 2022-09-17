import type { TinaCloudCollection } from 'tinacms'
import { defineSchema } from 'tinacms'

export enum Collection {
  Contents = 'contents',
  Ingredients = 'ingredients',
  Recipes = 'recipes',
}

type Configs = {
  collection: TinaCloudCollection
  document: Parameters<NonNullable<NonNullable<TinaCloudCollection['ui']>['router']>>['0']['document']
}

// DEBT: current can move the content to the root as tina is not dealing well with relative path that are above the root
// Note: any path are relative to root of this package
const APP_CONTEXT = 'recipe'
const CONTEXT_PATH = 'contents'
const MEDIA_ROOT = 'media'
const PUBLIC_PATH = 'assets'

function router(configs: Configs): string {
  if (configs.collection.name === Collection.Contents) {
    return `/${APP_CONTEXT}/${configs.document._sys.filename}`
  }

  return `/${APP_CONTEXT}/${configs.collection.name}/${configs.document._sys.filename}`
}

export const formatMap: Record<Collection, NonNullable<TinaCloudCollection['format']>> = {
  [Collection.Contents]: 'mdx',
  [Collection.Ingredients]: 'mdx',
  [Collection.Recipes]: 'mdx',
}

export const schema = defineSchema({
  config: {
    branch: 'cms-edit',
    clientId: '',
    token: '',
    media: {
      tina: {
        mediaRoot: MEDIA_ROOT,
        publicFolder: PUBLIC_PATH,
      },
    },
  },

  collections: [
    {
      format: formatMap[Collection.Contents],
      label: Collection.Contents,
      name: Collection.Contents,
      path: `${CONTEXT_PATH}/${APP_CONTEXT}/${Collection.Contents}`,
      ui: { router },
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
      format: formatMap[Collection.Ingredients],
      label: Collection.Ingredients,
      name: Collection.Ingredients,
      path: `${CONTEXT_PATH}/${APP_CONTEXT}/${Collection.Ingredients}`,
      ui: { router },
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
      format: formatMap[Collection.Recipes],
      label: Collection.Recipes,
      name: Collection.Recipes,
      path: `${CONTEXT_PATH}/${APP_CONTEXT}/${Collection.Recipes}`,
      ui: { router },
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
