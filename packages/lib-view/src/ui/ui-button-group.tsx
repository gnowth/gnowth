import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIButtonGroup {
  as?: string
}

export interface PropsUIButtonGroup {
  children: ReactNode
}

export const UIButtonGroup: FunctionComponent<PropsUIButtonGroup> = (props) => (
  <div className="ui-button-group">{props.children}</div>
)
