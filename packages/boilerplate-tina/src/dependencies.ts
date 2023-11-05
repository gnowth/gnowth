import { RouteModel } from '@gnowth/logic-core'

import { ModelTinaSchema } from './tina.models'

const routeModel = new RouteModel()
export const dependencies = {
  modelTinaSchema: new ModelTinaSchema({ dependencies: { routeModel } }),
}
