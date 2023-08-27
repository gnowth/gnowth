import { Model } from '@gnowth/lib-react'

import type { User } from '../types'

class ModelUser<Value extends User = User> extends Model<Value> {
  modelName = 'user'
}

export default ModelUser
