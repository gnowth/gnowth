import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIScrollSpy {
  as?: string
}

export interface PropsUIScrollSpy {
  children: ReactNode
}

export const UIScrollSpy: FunctionComponent<PropsUIScrollSpy> = (props) => (
  <div className="ui-scroll-spy">{props.children}</div>
)
