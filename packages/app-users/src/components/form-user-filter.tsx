import type { FunctionComponent } from 'react'

import { DataConnect, DataSource, DataTrigger, LayoutSection, useTranslation } from '@gnowth/lib-react'
import { useState } from 'react'
import { useRecoilState } from 'recoil'

import { stateUserFilter } from '../components/section-users'
import { dependencies } from '../dependencies'
import { withAugmented } from './with-augmented'

// DEBT: Convert status input to dropdown
const FormUserFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)
  const [filters, setFilters] = useRecoilState(stateUserFilter)
  const [initialFilters] = useState(filters)

  return (
    <LayoutSection variant="container">
      <DataSource
        layout="flex"
        layoutVariant="horizontalBottom"
        mode="uncontrolled"
        onSubmit={(value) => setFilters({ ...value, page: 1 })}
        value={initialFilters}
      >
        <DataConnect
          component="text"
          id="form-user-filter-email"
          labelValue={t('Email')}
          name="email"
          placeholder={t('email')}
        />

        <DataConnect
          component="text"
          id="form-user-filter-status"
          labelValue={t('Status')}
          name="status"
          placeholder={t('status')}
        />

        <DataTrigger componentValue={t('Submit')} submit />
      </DataSource>
    </LayoutSection>
  )
}

export const FormUserFilter = withAugmented()(FormUserFilterComponent)
