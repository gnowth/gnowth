import React from 'react'

export interface VariantUICard {
  as?: string
}

export interface PropsUICard {
  children: React.ReactNode
}

export const UICard: React.FunctionComponent<PropsUICard> = (props) => (
  <div className="ui-card">{props.children}</div>
)
