import { ModelRoute } from '@gnowth/logic-core'

import { ModelTinaSchema } from './tina.models'

const modelRoute = new ModelRoute()
export const dependencies = {
  modelTinaSchema: new ModelTinaSchema({ dependencies: { modelRoute } }),
}
