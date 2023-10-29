import type { HigherComponent } from '@gnowth/lib-react'
import type { ComponentProps, ComponentType } from 'react'

import { SystemBoundaryDeprecated } from './system-boundary-deprecated'
import { SystemSuspenseDeprecated } from './system-suspense-deprecated'

type PropsAugmented = {
  ErrorComponent?: ComponentProps<typeof SystemBoundaryDeprecated>['FallbackComponent']
  LoadingComponent?: ComponentProps<typeof SystemSuspenseDeprecated>['FallbackComponent']
}

type AugmentedComponentType<Props> = ComponentType<Props> & {
  ErrorComponent?: PropsAugmented['ErrorComponent']
  LoadingComponent?: PropsAugmented['LoadingComponent']
}

// DEBT: allow default error/loading component through context and allow null value to skip default
// Note: if FallbackComponent is null, it skips default FallbackComponent
// TODO: remove JSX and use react Attributes
export function withAugmentedDeprecated<Props extends JSX.IntrinsicAttributes>(
  propsAugmented?: PropsAugmented,
): HigherComponent<Props> {
  return function withAugmentedHOC(Component: AugmentedComponentType<Props>) {
    return function WithAugmentedComponent(props: Props) {
      return (
        <SystemSuspenseDeprecated
          FallbackComponent={
            Component.LoadingComponent === undefined
              ? propsAugmented?.LoadingComponent
              : Component.LoadingComponent
          }
        >
          <SystemBoundaryDeprecated
            FallbackComponent={
              Component.ErrorComponent === undefined
                ? propsAugmented?.ErrorComponent
                : Component.ErrorComponent
            }
          >
            <Component {...props} />
          </SystemBoundaryDeprecated>
        </SystemSuspenseDeprecated>
      )
    }
  }
}
