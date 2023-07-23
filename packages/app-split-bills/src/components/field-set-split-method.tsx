import type { FunctionComponent } from 'react'
import { FormFieldSet, FormData, FormInput } from '@gnowth/lib-react'

import type { SplitParticipant } from '../modules/split-bill'
import { LayoutFieldSetSplitMethod } from './field-set-split-method.components'

interface Props {
  participants: SplitParticipant
}

export const FieldSetSplitMethod: FunctionComponent<Props> = (props) => {
  return (
    <FormFieldSet layout={LayoutFieldSetSplitMethod}>
      <FormInput name="enabled" />

      <FormData nameId="participantId" values={props.participants} />

      <FormInput name="type" />

      <FormInput name="value" />
    </FormFieldSet>
  )
}
