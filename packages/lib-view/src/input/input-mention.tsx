import type { FunctionComponent } from 'react'

export interface VariantInputMention {
  as?: string
}

export interface PropsInputMention {
  name?: string
}

export const InputMention: FunctionComponent<PropsInputMention> = (props) => (
  <input className="input-mention" name={props.name} />
)
