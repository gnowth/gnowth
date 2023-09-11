import React from 'react'

export interface VariantUIDialog {
  as?: string
}

export interface PropsUIDialog {
  children: React.ReactNode
}

export const UIDialog: React.FunctionComponent<PropsUIDialog> = (props) => (
  <div className="ui-dialog">{props.children}</div>
)
