import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIChip {
  as?: string
}

export interface PropsUIChip {
  children: ReactNode
}

export const UIChip: FunctionComponent<PropsUIChip> = (props) => (
  <div className="ui-chip">{props.children}</div>
)
