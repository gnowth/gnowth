import { Fields, Model, QueryApiRest } from '@gnowth/lib-react'

import type { Recipe } from './recipes.types'
import { ModelIngredient } from './ingredients'

interface Configs {
  dependencies: {
    modelUser: Model
  }
}

// TODO set as token
enum Permissions {
  create,
  delete,
  read,
  write,
}

type Perms = {
  [key in Permissions]?: () => boolean
}

export class ModelRecipe<Value extends Recipe = Recipe> extends Model<Value, Configs> {
  api: QueryApiRest<Value> = new QueryApiRest({
    endpoint: '/api/v1/recipes/recipes/',
    model: this,
  })

  modelName = 'recipe'

  schema = {
    createdBy: new Fields.FieldModel({
      model: this.dependencies.modelUser,
    }),
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
