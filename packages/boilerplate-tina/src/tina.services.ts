import { client } from './client'
import { schema } from './client.configs'
import { dependencies } from './dependencies'
import { CollectionEnum } from './tina.models'

export class ServiceTina {
  private dependencies = dependencies
  private schema = schema

  async getContentsSlugs(): Promise<string[]> {
    const connection = await client.queries.contentsConnection()
    const edges = connection.data.contentsConnection.edges ?? []

    return edges.map((edge) => edge?.node?._sys.filename ?? '').filter((slug): slug is string => !!slug)
  }

  async getContentsContent(slug: string) {
    const format = this.dependencies.modelTinaSchema.getFormatFromSchema(this.schema, CollectionEnum.Contents)

    return client.queries.contents({ relativePath: `${slug}.${format}` })
  }

  async getIngredientsSlugs(): Promise<string[]> {
    const connection = await client.queries.ingredientsConnection()
    const edges = connection.data.ingredientsConnection.edges ?? []

    return edges.map((edge) => edge?.node?._sys.filename ?? '').filter((slug): slug is string => !!slug)
  }

  async getIngredientsContent(slug: string) {
    const format = this.dependencies.modelTinaSchema.getFormatFromSchema(
      this.schema,
      CollectionEnum.Ingredients,
    )

    return client.queries.ingredients({ relativePath: `${slug}.${format}` })
  }

  async getRecipesSlugs(): Promise<string[]> {
    const connection = await client.queries.recipesConnection()
    const edges = connection.data.recipesConnection.edges ?? []

    return edges.map((edge) => edge?.node?._sys.filename ?? '').filter((slug): slug is string => !!slug)
  }

  async getRecipesContent(slug: string) {
    const format = this.dependencies.modelTinaSchema.getFormatFromSchema(this.schema, CollectionEnum.Recipes)

    return client.queries.recipes({ relativePath: `${slug}.${format}` })
  }
}
