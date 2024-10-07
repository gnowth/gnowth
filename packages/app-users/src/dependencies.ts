import { FilterModel } from '@gnowth/lib-react'

import { UserFilterModel } from './modules/user-filters'

export const dependencies = {
  userFilterModel: new UserFilterModel({ filterModel: new FilterModel() }),
}
