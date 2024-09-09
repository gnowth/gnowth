import type { RenderOptions } from '@testing-library/react'
import type { ComponentType } from 'react'

import { act, render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import * as R from 'remeda'

type Loader<TParameters extends object> = (parameters: TParameters) => Promise<void>
const testRunLoaders = async <TParameters extends object>(
  loaders: Loader<TParameters>[],
  parameters: TParameters,
) => {
  for (const loader of loaders) {
    await loader(parameters)
  }
}

type ParametersSetup<TParameters extends object> = {
  loaders?: Loader<TParameters>[]
  parameters?: TParameters
  parametersMerge?: (overrides: (TParameters | undefined)[]) => TParameters
  wrapper?: ComponentType
}
type ParametersDefault<TProps, TParameters> = {
  Component: ComponentType<TProps>
  parameters?: TParameters
  props?: TProps
  propsMerge?: (overrides: (Partial<TProps> | undefined)[]) => TProps
  renderOptions?: RenderOptions
}
type ParametersOverride<TProps, TParameters> = {
  parameters?: TParameters
  props?: Partial<TProps>
  renderOptions?: RenderOptions
}
export const testSetupRenderComponent =
  <TParameters extends object>(parametersSetup?: ParametersSetup<TParameters>) =>
  <TProps extends object>(parametersDefault: ParametersDefault<TProps, TParameters>) =>
  async (parametersOverride?: ParametersOverride<TProps, TParameters>) => {
    const user = userEvent.setup()
    const loaders = parametersSetup?.loaders ?? []
    const propsMerge =
      parametersDefault.propsMerge ??
      (R.mergeAll as unknown as (overrides: (Partial<TProps> | undefined)[]) => TProps)
    const props = propsMerge([parametersDefault.props, parametersOverride?.props])
    const parametersMerger =
      parametersSetup?.parametersMerge ??
      (R.mergeAll as unknown as (overrides: (TParameters | undefined)[]) => TParameters)
    const parameters = parametersMerger([
      parametersSetup?.parameters,
      parametersDefault.parameters,
      parametersOverride?.parameters,
    ])

    await testRunLoaders(loaders, parameters)

    const Component = parametersDefault.Component
    const result = render(<Component {...props} />, {
      wrapper: parametersSetup?.wrapper,
      ...parametersDefault.renderOptions,
      ...parametersOverride?.renderOptions,
    })

    const rerender = async (parametersRerender?: ParametersOverride<TProps, TParameters>) => {
      await act(() => testRunLoaders(loaders, parametersMerger([parameters, parametersRerender?.parameters])))
      return result.rerender(<Component {...propsMerge([props, parametersRerender?.props])} />)
    }

    return {
      user,
      ...result,
      rerender,
    }
  }
