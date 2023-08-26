import React from 'react'

export interface VariantUIChip {
  as?: string
}

export interface PropsUIChip {
  children: React.ReactNode
}

const UIChip: React.FunctionComponent<PropsUIChip> = (props) => (
  <div className="ui-chip">{props.children}</div>
)

export default UIChip
