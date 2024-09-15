import type { FunctionComponent } from 'react'

export interface PropsUIImage {
  alt?: string
  as?: string
  src: string
}

export const UIImage: FunctionComponent<PropsUIImage> = (props) => (
  <img alt={props.alt} className="ui-image" data-testid="view-ui-image" src={props.src} />
)
