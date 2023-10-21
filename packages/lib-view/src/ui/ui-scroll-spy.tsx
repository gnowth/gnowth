import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUIScrollSpy {
  as?: string
  children: ReactNode
}

export const UIScrollSpy: FunctionComponent<PropsUIScrollSpy> = (props) => (
  <div className="ui-scroll-spy">{props.children}</div>
)
