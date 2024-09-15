import { FunctionComponent } from 'react'

export interface PropsInputSelect {
  as?: string
  name?: string
}

export const InputSelect: FunctionComponent<PropsInputSelect> = (props) => (
  <input className="input-select" data-testid="view-input-select" name={props.name} />
)
