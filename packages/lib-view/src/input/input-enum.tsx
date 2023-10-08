import type { FunctionComponent } from 'react'

export interface VariantInputEnum {
  as?: string
}

export interface PropsInputEnum {
  name?: string
}

export const InputEnum: FunctionComponent<PropsInputEnum> = (props) => (
  <input className="input-enum" name={props.name} />
)
