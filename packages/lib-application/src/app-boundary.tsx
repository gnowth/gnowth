import type { PropsBoundary } from '@gnowth/lib-types'
import type { Theme } from '@gnowth/lib-theme'
import type { ComponentType, ErrorInfo, ContextType, ReactElement, ReactNode } from 'react'
import { Component, createElement } from 'react'
import { guardString, UtilError } from '@gnowth/lib-utils'

import { ContextEnvironment } from './context-environment'
import { withAppTheme } from './with-app-theme'

interface Props {
  children: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  shouldSkip?: (error: Error) => boolean
}

interface WithTheme {
  theme: Theme
}

interface State {
  error: UtilError | null
}

class AppBoundaryComponent extends Component<Props & WithTheme, State> {
  // eslint-disable-next-line react/static-property-placement
  static contextType = ContextEnvironment

  static getDerivedStateFromError(error: UtilError): State {
    return {
      error,
    }
  }

  // TODO: check if declare is right here
  // eslint-disable-next-line react/static-property-placement
  declare context: ContextType<typeof ContextEnvironment>

  constructor(props: Props & WithTheme) {
    super(props)

    this.state = { error: null }
  }

  componentDidCatch(error: UtilError, errorInfo: ErrorInfo): void {
    if (this.props.shouldSkip?.(error)) throw error

    this.props.onError?.(error, errorInfo)
  }

  getComponent(error: UtilError): ComponentType<PropsBoundary> | undefined {
    const keys = Object.keys(this.context.boundaries)
    const types = guardString(error.type) ? [error.type] : error.type || []
    const typeError = types.find((type) => keys.includes(type))
    const ComponentDefault = this.props.theme.getComponent<PropsBoundary>({
      component: 'error',
      namespace: 'type',
    })

    return this.context.boundaries[typeError ?? ''] || ComponentDefault
  }

  render(): ReactElement | null {
    if (!this.state.error) return <>{this.props.children}</>

    const props = { value: this.state.error }

    const component = this.getComponent(this.state.error)

    if (!component) {
      throw new UtilError({
        message: 'Default error component has not been set',
        method: 'AppBoundary.render',
        package: '@gnowth/lib-application',
        type: 'internal',
      })
    }

    return createElement(component, props)
  }
}

export const AppBoundary = withAppTheme<Props>(AppBoundaryComponent)
