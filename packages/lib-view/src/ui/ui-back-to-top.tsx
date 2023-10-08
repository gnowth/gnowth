import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIBackToTop {
  as?: string
}

export interface PropsUIBackToTop {
  children: ReactNode
}

export const UIBackToTop: FunctionComponent<PropsUIBackToTop> = (props) => (
  <div className="ui-back-to-top">{props.children}</div>
)
