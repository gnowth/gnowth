// Note: see ant design. very similar to skeleton
import React from 'react'

export interface VariantUIEmpty {
  as?: string
}

export interface PropsUIEmpty {
  children: React.ReactNode
}

const UIEmpty: React.FunctionComponent<PropsUIEmpty> = (props) => (
  <div className="ui-empty">{props.children}</div>
)

export default UIEmpty
