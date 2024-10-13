import { FunctionComponent } from 'react'

export type PropsInputTextarea = {
  as?: string
  name?: string
}

export const InputTextarea: FunctionComponent<PropsInputTextarea> = (props) => (
  <input className="input-textarea" data-testid="view-input-textarea" name={props.name} />
)
