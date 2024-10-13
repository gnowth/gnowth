import { Model, QueryApiRest } from '@gnowth/lib-react'

import { Ingredient } from '../modules/ingredients'

export class ModelIngredient<Value extends Ingredient = Ingredient> extends Model<Value> {
  api = new QueryApiRest<Value>({
    endpoint: '/api/v1/recipes/ingredients/',
    model: this,
  })

  modelName = 'ingredient'
}
