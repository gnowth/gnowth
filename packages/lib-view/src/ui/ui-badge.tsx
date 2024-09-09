import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUIBadge {
  as?: string
  children: ReactNode
}

export const UIBadge: FunctionComponent<PropsUIBadge> = (props) => (
  <div className="ui-badge" data-testid="view-ui-badge">
    {props.children}
  </div>
)
