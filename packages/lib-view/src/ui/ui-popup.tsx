import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIPopup {
  as?: string
}

export interface PropsUIPopup {
  children: ReactNode
}

export const UIPopup: FunctionComponent<PropsUIPopup> = (props) => (
  <div className="ui-popup">{props.children}</div>
)
