import { FunctionComponent } from 'react'

export interface PropsInputMention {
  as?: string
  name?: string
}

export const InputMention: FunctionComponent<PropsInputMention> = (props) => (
  <input className="input-mention" data-testid="view-input-mention" name={props.name} />
)
