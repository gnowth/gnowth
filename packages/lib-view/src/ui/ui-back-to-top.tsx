import { FunctionComponent, ReactNode } from 'react'

export type PropsUIBackToTop = {
  as?: string
  children: ReactNode
}

export const UIBackToTop: FunctionComponent<PropsUIBackToTop> = (props) => (
  <div className="ui-back-to-top" data-testid="view-ui-back-to-top">
    {props.children}
  </div>
)
