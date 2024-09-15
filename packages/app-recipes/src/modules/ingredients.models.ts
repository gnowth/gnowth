import { Model, QueryApiRest } from '@gnowth/lib-react'

import { Ingredient } from '../modules/ingredients'

export class ModelIngredient<Value extends Ingredient = Ingredient> extends Model<Value> {
  api: QueryApiRest<Value> = new QueryApiRest({
    endpoint: '/api/v1/recipes/ingredients/',
    model: this,
  })

  modelName = 'ingredient'
}
