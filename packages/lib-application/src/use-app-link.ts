import { Model } from '@gnowth/lib-model'
import { ObjectLiteral } from '@gnowth/lib-utils'

import { AppModelApplication } from './app-model-application'
import { useAppApplication } from './use-app-application'

type Props<Value extends ObjectLiteral> = {
  application?: AppModelApplication | string
  model?: Model<Value> | string
  page?: string
  to?: string
  value?: Value
}

export function useAppLink<Value extends ObjectLiteral>(props: Props<Value>): string | undefined {
  const application = useAppApplication(props.application)

  if (props.to) return props.to

  if (props.model) {
    const model = application.getModel(props.model)
    return model?.valueToRoute(props.value)
  }

  return application.getRoute(props.page)
}
