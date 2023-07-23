import type { FunctionComponent } from 'react'
import { LayoutSection, Form, FormAction, FormInput, useQueryParams, useTranslation } from '@gnowth/lib-react'

import { LayoutFormSplitBill, LayoutFormSplitBillLg } from './form-split-bill.components'
import { FieldSetSplitMethod } from './field-set-split-method'

export const FormSplitBill: FunctionComponent = () => {
  const { serviceSplitBill, serviceLogger } = useServices(['serviceSplitBill', 'serviceLogger'])
  const { splitBillId } = useQueryParams<{ splitBillId: string }>(['splitBillId'])
  const { t } = useTranslation()

  return (
    <LayoutSection>
      <Form
        boundary={() => <div />}
        suspense={() => <div />}
        dataId={splitBillId}
        layout={{ default: LayoutFormSplitBill, lg: LayoutFormSplitBillLg }}
        service={serviceSplitBill}
        services={{ serviceLogger }}
      >
        <FormInput name="group" />

        <FormInput name="amount" validate={async () => []} />

        <FormInput type="date" name="date" />

        <FormInput type="time" name="date" />

        <FormInput name="paidBy" />

        <FormInput name="splits" component={FieldSetSplitMethod} />

        <FormAction>{t(splitBillId ? 'Create' : 'Save')}</FormAction>
      </Form>
    </LayoutSection>
  )
}
