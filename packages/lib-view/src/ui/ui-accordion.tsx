// Note: should UICollapse be different?
import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUIAccordion {
  as?: string
}

export interface PropsUIAccordion {
  children: ReactNode
}

export const UIAccordion: FunctionComponent<PropsUIAccordion> = (props) => (
  <div className="ui-accordion">{props.children}</div>
)
