import { FunctionComponent } from 'react'

export type PropsInputTransfer = {
  as?: string
  name?: string
}

// Note: see materialui transfer list
export const InputTransfer: FunctionComponent<PropsInputTransfer> = (props) => (
  <input className="input-transfer" data-testid="view-input-transfer" name={props.name} />
)
