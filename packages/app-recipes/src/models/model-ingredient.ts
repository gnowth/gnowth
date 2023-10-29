import { Model, QueryApiRest } from '@gnowth/lib-react'

import type { Ingredient } from '../types'

export class ModelIngredient<Value extends Ingredient = Ingredient> extends Model<Value> {
  api: QueryApiRest<Value> = new QueryApiRest({
    endpoint: '/api/v1/recipes/ingredients/',
    model: this,
  })

  modelName = 'ingredient'
}
