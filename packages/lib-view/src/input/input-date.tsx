import type { FunctionComponent } from 'react'

export interface PropsInputDate {
  as?: string
  name?: string
}

export const InputDate: FunctionComponent<PropsInputDate> = (props) => (
  <input className="input-date" data-testid="view-input-date" name={props.name} />
)
