import type { HigherComponent } from '@gnowth/lib-react'
import type { ComponentProps, ComponentType } from 'react'

import { SystemBoundary } from '../components/system-boundary'
import { SystemSuspense } from '../components/system-suspense'

type PropsAugmented = {
  ErrorComponent?: ComponentProps<typeof SystemBoundary>['FallbackComponent']
  LoadingComponent?: ComponentProps<typeof SystemSuspense>['FallbackComponent']
}

type AugmentedComponentType<Props> = ComponentType<Props> & {
  ErrorComponent?: PropsAugmented['ErrorComponent']
  LoadingComponent?: PropsAugmented['LoadingComponent']
}

// DEBT: allow default error/loading component through context and allow null value to skip default
// Note: if FallbackComponent is null, it skips default FallbackComponent
// TODO: remove JSX and use react Attributes
export function withAugmented<Props extends JSX.IntrinsicAttributes>(
  propsAugmented?: PropsAugmented,
): HigherComponent<Props> {
  return function withAugmentedHOC(Component: AugmentedComponentType<Props>) {
    return function WithAugmentedComponent(props: Props) {
      return (
        <SystemSuspense
          FallbackComponent={
            Component.LoadingComponent === undefined
              ? propsAugmented?.LoadingComponent
              : Component.LoadingComponent
          }
        >
          <SystemBoundary
            FallbackComponent={
              Component.ErrorComponent === undefined
                ? propsAugmented?.ErrorComponent
                : Component.ErrorComponent
            }
          >
            <Component {...props} />
          </SystemBoundary>
        </SystemSuspense>
      )
    }
  }
}
