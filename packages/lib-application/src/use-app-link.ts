import type { Model } from '@gnowth/lib-model'
import type { ObjectLike } from '@gnowth/lib-utils'

import type { AppModelApplication } from './app-model-application'
import { useAppApplication } from './use-app-application'

interface Props<Value extends ObjectLike> {
  application?: AppModelApplication | string
  model?: Model<Value> | string
  page?: string
  to?: string
  value?: Value
}

export function useAppLink<Value extends ObjectLike>(props: Props<Value>): string | undefined {
  const application = useAppApplication(props.application)

  if (props.to) return props.to

  if (props.model) {
    const model = application.getModel(props.model)
    const route = model?.valueToRoute(props.value)

    return route
  }

  return application.getRoute(props.page)
}
