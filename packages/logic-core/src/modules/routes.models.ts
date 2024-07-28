enum ContextApp {
  Recipes = 'recipes',
  Users = 'users',
}

enum ContextRecipes {
  Ingredients = 'ingredients',
  Recipes = 'recipes',
}

enum ContextUsers {
  Groups = 'groups',
  User = 'user',
  Users = 'users',
}
const idPath = (id?: string) => (id ? `/${id}` : '')
export class RouteModel {
  recipes = (context?: string, id?: string) => `/${ContextApp.Recipes}/${context}${idPath(id)}`
  recipesContents = (id?: string) => `/${ContextApp.Recipes}${idPath(id)}`
  recipesIngredients = (id?: string) => `/${ContextApp.Recipes}/${ContextRecipes.Ingredients}${idPath(id)}`
  recipesRecipes = (id?: string) => `/${ContextApp.Recipes}/${ContextRecipes.Recipes}${idPath(id)}`
  usersGroups = (id?: string) => `/${ContextApp.Users}/${ContextUsers.Groups}${idPath(id)}`
  usersUserNew = () => `/${ContextApp.Users}/${ContextUsers.User}`
  usersUsers = (id?: string) => `/${ContextApp.Users}/${ContextUsers.Users}${idPath(id)}`
}
