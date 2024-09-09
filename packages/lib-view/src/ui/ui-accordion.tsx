// Note: should UICollapse be different?
import type { FunctionComponent, ReactNode } from 'react'

export interface PropsUIAccordion {
  as?: string
  children: ReactNode
}

export const UIAccordion: FunctionComponent<PropsUIAccordion> = (props) => (
  <div className="ui-accordion" data-testid="view-ui-accordion">
    {props.children}
  </div>
)
