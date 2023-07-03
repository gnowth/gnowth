import { ModelRoute } from '@gnowth/core-logic'

import { ModelTinaSchema } from './tina.models'

const modelRoute = new ModelRoute()
export const dependencies = {
  modelTinaSchema: new ModelTinaSchema({ dependencies: { modelRoute } }),
}
