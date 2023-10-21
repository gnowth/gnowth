import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUISnackbar {
  as?: string
  children: ReactNode
}

export const UISnackbar: FunctionComponent<PropsUISnackbar> = (props) => (
  <div className="ui-snackbar">{props.children}</div>
)
