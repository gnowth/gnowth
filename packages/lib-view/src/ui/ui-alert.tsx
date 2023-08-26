import React from 'react'

export interface VariantUIAlert {
  as?: string
}

export interface PropsUIAlert {
  children: React.ReactNode
}

const UIAlert: React.FunctionComponent<PropsUIAlert> = (props) => (
  <div className="ui-alert">{props.children}</div>
)

export default UIAlert
