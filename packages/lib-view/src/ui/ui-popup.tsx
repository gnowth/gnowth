import { FunctionComponent, ReactNode } from 'react'

export type PropsUIPopup = {
  as?: string
  children: ReactNode
}

export const UIPopup: FunctionComponent<PropsUIPopup> = (props) => (
  <div className="ui-popup" data-testid="view-ui-popup">
    {props.children}
  </div>
)
