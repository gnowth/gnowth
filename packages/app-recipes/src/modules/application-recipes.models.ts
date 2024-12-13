import { AppModelApplication, QueryResource } from '@gnowth/lib-react'

import { Ingredient, ModelIngredient } from './ingredients'
import { ModelRecipe, Recipe } from './recipes'

export enum TokenPage {
  dashboard = 'dashboard',
  ingredient = 'ingredient',
  landing = 'landing',
  recipe = 'recipe',
  recipes = 'recipes',
  root = 'root',
}

type Configs = {
  route?: string
}

type ParamsRoute = {
  pageId?: string
}

type ResourceIngredient = {
  ingredient: QueryResource<Ingredient>
}

type ResourceRecipe = {
  recipe: QueryResource<Recipe>
}

type ResourceRecipes = {
  ingredients: QueryResource<Ingredient[]>
  recipes: QueryResource<Recipe[]>
}

export class AppModelApplicationRecipes extends AppModelApplication<Configs> {
  models = {
    ingredient: new ModelIngredient({}),
    recipe: new ModelRecipe({}),
  }

  permissions = {
    [TokenPage.dashboard]: (): boolean => true,
  }

  resources = {
    [TokenPage.ingredient]: (paramsRoute: ParamsRoute): ResourceIngredient => ({
      ingredient: this.models.ingredient.api.resourceRetrieve({ id: paramsRoute.pageId }),
    }),

    [TokenPage.recipe]: (paramsRoute: ParamsRoute): ResourceRecipe => ({
      recipe: this.models.recipe.api.resourceRetrieve({ id: paramsRoute.pageId }),
    }),

    [TokenPage.recipes]: (): ResourceRecipes => ({
      ingredients: this.models.ingredient.api.resourceList(),
      recipes: this.models.recipe.api.resourceList(),
    }),
  }

  routes = {
    [TokenPage.dashboard]: (): string => `${this.route}dashboard/`,
    [TokenPage.ingredient]: (id = ':pageId'): string => `${this.route}ingredients/${id}/`,
    [TokenPage.landing]: (): string => `${this.route}landing/`,
    [TokenPage.recipe]: (id = ':pageId'): string => `${this.route}recipes/${id}/`,
    [TokenPage.recipes]: (): string => `${this.route}recipes/`,
    [TokenPage.root]: (): string => this.route,
  }
}
