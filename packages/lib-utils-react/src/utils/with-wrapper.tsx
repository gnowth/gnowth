import { ComponentType, FunctionComponent, ReactNode } from 'react'
import * as R from 'remeda'

type WrapperProps = {
  children: ReactNode
}
type Parameters<TProps, TWrapperProps extends WrapperProps> = {
  Component: ComponentType<TProps>
  Wrapper: ComponentType<TWrapperProps>
  wrapperProps?: ((props: TProps) => TWrapperProps) | TWrapperProps
}
export function withWrapper<TProps extends JSX.IntrinsicAttributes, TWrapperProps extends WrapperProps>(
  parameters: Parameters<TProps, TWrapperProps>,
) {
  const HigherOrderComponent: FunctionComponent<TProps> = (props) => {
    const { Component, Wrapper } = parameters
    const wrapperProps = R.isFunction(parameters.wrapperProps)
      ? parameters.wrapperProps(props)
      : parameters.wrapperProps
    return (
      <Wrapper {...(wrapperProps as TWrapperProps)}>
        <Component {...props} />
      </Wrapper>
    )
  }
  return HigherOrderComponent
}
