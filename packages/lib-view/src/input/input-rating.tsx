import { FunctionComponent } from 'react'

export type PropsInputRating = {
  as?: string
  name?: string
}

export const InputRating: FunctionComponent<PropsInputRating> = (props) => (
  <input className="input-rating" data-testid="view-input-rating" name={props.name} />
)
