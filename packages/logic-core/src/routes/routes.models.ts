export enum ContextApp {
  Recipes = 'recipes',
  Users = 'users',
}

export enum ContextRecipes {
  Recipes = 'recipes',
  Ingredients = 'ingredients',
}

enum ContextUsers {
  Users = 'users',
  Groups = 'groups',
}

export class ModelRoute {
  recipes = (context?: string, id?: string) => {
    return `/${ContextApp.Recipes}/${context}${id ? `/${id}` : ''}`
  }
  recipesContents = (id?: string) => `/${ContextApp.Recipes}${id ? `/${id}` : ''}`
  recipesIngredients = (id?: string) =>
    `/${ContextApp.Recipes}/${ContextRecipes.Ingredients}${id ? `/${id}` : ''}`
  recipesRecipes = (id?: string) => `/${ContextApp.Recipes}/${ContextRecipes.Recipes}${id ? `/${id}` : ''}`
  usersGroups = (id?: string) => `/${ContextApp.Users}/${ContextUsers.Groups}${id ? `/${id}` : ''}`
  usersUsers = (id?: string) => `/${ContextApp.Users}/${ContextUsers.Users}${id ? `/${id}` : ''}`
}
