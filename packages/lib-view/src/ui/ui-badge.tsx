import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIBadge {
  as?: string
}

export interface PropsUIBadge {
  children: ReactNode
}

export const UIBadge: FunctionComponent<PropsUIBadge> = (props) => (
  <div className="ui-badge">{props.children}</div>
)
