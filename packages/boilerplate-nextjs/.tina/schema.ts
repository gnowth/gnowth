import { defineSchema } from 'tinacms'

export enum Collection {
  Ingredient = 'ingredient',
  Page = 'page',
  Recipe = 'recipe',
}

// DEBT: need to add clientId and token
const schema = defineSchema({
  config: {
    // branch: 'cms-tina',
    // clientId: '',
    // token: '',
    media: {
      tina: {
        mediaRoot: 'media',
        publicFolder: 'public',
      },
    },
  },

  collections: [
    {
      label: 'Ingredients',
      name: Collection.Ingredient,
      path: 'contents/recipe/ingredients',
      format: 'mdx',
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
      label: 'Pages',
      name: Collection.Page,
      path: 'contents/recipe/pages',
      format: 'mdx',
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
      label: 'Recipes',
      name: Collection.Recipe,
      path: 'contents/recipe/recipes',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'Blog Post Body',
          name: 'body',
          isBody: true,
          ui: {
            component: 'textarea',
          },
        },
      ],
    },
  ],
})

export default schema
