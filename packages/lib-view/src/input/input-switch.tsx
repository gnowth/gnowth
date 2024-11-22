import { FunctionComponent } from 'react'

export type PropsInputSwitch = {
  as?: string
  name?: string
}

export const InputSwitch: FunctionComponent<PropsInputSwitch> = (props) => (
  <input className="input-switch" data-testid="view-input-switch" name={props.name} />
)
