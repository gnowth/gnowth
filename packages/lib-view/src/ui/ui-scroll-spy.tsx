import { FunctionComponent, ReactNode } from 'react'

export type PropsUIScrollSpy = {
  as?: string
  children: ReactNode
}

export const UIScrollSpy: FunctionComponent<PropsUIScrollSpy> = (props) => (
  <div className="ui-scroll-spy" data-testid="view-ui-scroll-spy">
    {props.children}
  </div>
)
