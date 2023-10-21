import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUIPopup {
  as?: string
  children: ReactNode
}

export const UIPopup: FunctionComponent<PropsUIPopup> = (props) => (
  <div className="ui-popup">{props.children}</div>
)
