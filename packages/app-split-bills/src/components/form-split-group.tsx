import type { FunctionComponent } from 'react'
import { LayoutSection, Form, useQueryParams } from '@gnowth/lib-react'

interface Props {
  formId?: string
}

export const FormSplitGroup: FunctionComponent<Props> = (props: Props) => {
  const { serviceSplitGroup } = useServices(['serviceSplitGroup'])
  const { splitGroupId } = useQueryParams<{ splitGroupId: string }>(['splitGroupId'])
  const { interfaceFormSplitGroup } = useInterface(InterfaceFormSplitGroup, {
    dependencies: { serviceSplitGroup },
    props: { dataId: splitGroupId, formId: props.formId ?? 'form-split-group' },
  })

  return (
    <LayoutSection>
      <Form interface={interfaceFormSplitGroup} />
    </LayoutSection>
  )
}
