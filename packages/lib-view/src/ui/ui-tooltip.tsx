import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUITooltip {
  as?: string
}

export interface PropsUITooltip extends VariantUITooltip {
  children: ReactNode
}

export const UITooltip: FunctionComponent<PropsUITooltip> = (props) => (
  <div className="ui-tooltip">{props.children}</div>
)
