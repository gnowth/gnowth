import type { FunctionComponent } from 'react'

export interface PropsInputTextarea {
  as?: string
  name?: string
}

export const InputTextarea: FunctionComponent<PropsInputTextarea> = (props) => (
  <input className="input-textarea" name={props.name} />
)
