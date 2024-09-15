import { FunctionComponent, ReactNode } from 'react'

export interface PropsUISnackbar {
  as?: string
  children: ReactNode
}

export const UISnackbar: FunctionComponent<PropsUISnackbar> = (props) => (
  <div className="ui-snackbar" data-testid="view-ui-snackbar">
    {props.children}
  </div>
)
