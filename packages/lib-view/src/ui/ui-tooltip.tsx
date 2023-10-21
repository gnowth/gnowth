import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUITooltip {
  as?: string
  children: ReactNode
}

export const UITooltip: FunctionComponent<PropsUITooltip> = (props) => (
  <div className="ui-tooltip">{props.children}</div>
)
