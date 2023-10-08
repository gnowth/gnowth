import type { FunctionComponent } from 'react'

export interface VariantInputTextarea {
  as?: string
}

export interface PropsInputTextarea {
  name?: string
}

export const InputTextarea: FunctionComponent<PropsInputTextarea> = (props) => (
  <input className="input-textarea" name={props.name} />
)
