import { Model, QueryApiRest } from '@gnowth/lib-react'

import type { Ingredient } from '../types'

class ModelIngredient<Value extends Ingredient = Ingredient> extends Model<Value> {
  api: QueryApiRest<Value> = new QueryApiRest({
    endpoint: '/api/v1/recipes/ingredients/',
    model: this,
  })

  modelName = 'ingredient'
}

export default ModelIngredient
