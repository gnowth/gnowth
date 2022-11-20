// DEBT: find why we can't just use './types'
export type {
  HigherComponent,
  MockConfigs,
  ServerEx,
  ServiceQueryKeyDetail,
  ServiceQueryKeyList,
} from './types.d'
export type { ErrorType } from './models/model-error'
export type { Detail, List, ListVerbose } from './models/model-axios'

export { default as InputPagination } from './components/input-pagination'
export { default as LayoutSection } from './components/layout-section'
export { default as NavLink } from './components/nav-link'
export { default as ViewProgressGlobal } from './components/view-progress-global'
export { default as ViewSpacer } from './components/view-spacer'

export { default as ModelAxios } from './models/model-axios'
export { default as ModelError } from './models/model-error'
export { default as ModelFilter, FilterPageSize } from './models/model-filter'

export { default as SerializerRest } from './utils/serializer-rest'
export { default as compose } from './utils/compose'
export { default as withBoundary } from './utils/with-boundary'
export { default as withSuspense } from './utils/with-suspense'

export { default as setup } from './setup'
