import { Fields, Model, QueryApiRest } from '@gnowth/lib-react'

import { ModelIngredient } from './ingredients'
import { Recipe } from './recipes.types'

// TODO set as token
enum Permissions {
  create,
  delete,
  read,
  write,
}

type Perms = {
  [_Key in Permissions]?: () => boolean
}

export class ModelRecipe<Value extends Recipe = Recipe> extends Model<Value> {
  api = new QueryApiRest<Value>({
    endpoint: '/api/v1/recipes/recipes/',
    model: this,
  })

  modelName = 'recipe'

  schema = {
    createdBy: new Fields.FieldText(),
    description: new Fields.FieldText(),
    designation: new Fields.FieldText(),
    ingredients: new Fields.FieldModel({
      many: true,
      model: new ModelIngredient({}),
    }),
    name: new Fields.FieldText(),
  }

  static getPermissions(): Perms {
    return {
      [Permissions.read]: () => true,
    }
  }
}
