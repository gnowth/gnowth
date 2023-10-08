import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUISnackbar {
  as?: string
}

export interface PropsUISnackbar {
  children: ReactNode
}

export const UISnackbar: FunctionComponent<PropsUISnackbar> = (props) => (
  <div className="ui-snackbar">{props.children}</div>
)
