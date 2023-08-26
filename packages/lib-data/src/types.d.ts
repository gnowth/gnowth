import type { DataName, PropsData } from '@gnowth/lib-types'

export interface WithConnect {
  connect<Value>(name?: DataName): PropsData<Value>
}
