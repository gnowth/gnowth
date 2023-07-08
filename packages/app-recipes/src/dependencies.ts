import { ModelError } from '@gnowth/logic-core'
import { ServiceTina } from '@gnowth/boilerplate-tina'

export const dependencies = {
  modelError: new ModelError(),
  serviceTina: new ServiceTina(),
}
