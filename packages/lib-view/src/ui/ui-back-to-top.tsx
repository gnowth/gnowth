import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUIBackToTop {
  as?: string
  children: ReactNode
}

export const UIBackToTop: FunctionComponent<PropsUIBackToTop> = (props) => (
  <div className="ui-back-to-top">{props.children}</div>
)
