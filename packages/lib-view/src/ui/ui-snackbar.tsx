import React from 'react'

export interface VariantUISnackbar {
  as?: string
}

export interface PropsUISnackbar {
  children: React.ReactNode
}

const UISnackbar: React.FunctionComponent<PropsUISnackbar> = (props) => (
  <div className="ui-snackbar">{props.children}</div>
)

export default UISnackbar
