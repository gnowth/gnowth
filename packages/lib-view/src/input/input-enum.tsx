import { FunctionComponent } from 'react'

export type PropsInputEnum = {
  as?: string
  name?: string
}

export const InputEnum: FunctionComponent<PropsInputEnum> = (props) => (
  <input className="input-enum" data-testid="view-input-enum" name={props.name} />
)
