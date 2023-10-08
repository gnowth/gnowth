import type { FunctionComponent, ReactNode } from 'react'

export interface VariantUICarousel {
  as?: string
}

export interface PropsUICarousel {
  children: ReactNode
}

export const UICarousel: FunctionComponent<PropsUICarousel> = (props) => (
  <div className="ui-carousel">{props.children}</div>
)
