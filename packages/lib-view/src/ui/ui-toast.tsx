import React from 'react'

export interface VariantUIToast {
  as?: string
}

export interface PropsUIToast extends VariantUIToast {
  children: React.ReactNode
}

export const UIToast: React.FunctionComponent<PropsUIToast> = (props) => (
  <div className="ui-toast">{props.children}</div>
)
