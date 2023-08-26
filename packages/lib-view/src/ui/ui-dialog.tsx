import React from 'react'

export interface VariantUIDialog {
  as?: string
}

export interface PropsUIDialog {
  children: React.ReactNode
}

const UIDialog: React.FunctionComponent<PropsUIDialog> = (props) => (
  <div className="ui-dialog">{props.children}</div>
)

export default UIDialog
