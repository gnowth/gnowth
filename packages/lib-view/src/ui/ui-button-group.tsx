import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUIButtonGroup {
  as?: string
  children: ReactNode
}

export const UIButtonGroup: FunctionComponent<PropsUIButtonGroup> = (props) => (
  <div className="ui-button-group">{props.children}</div>
)
