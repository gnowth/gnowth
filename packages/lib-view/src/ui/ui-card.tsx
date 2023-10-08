import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUICard {
  as?: string
}

export interface PropsUICard {
  children: ReactNode
}

export const UICard: FunctionComponent<PropsUICard> = (props) => (
  <div className="ui-card">{props.children}</div>
)
