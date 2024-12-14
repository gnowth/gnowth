import { DataConnect, DataSource, DataTrigger, LayoutSection } from '@gnowth/lib-react'
import { useAtom } from 'jotai'
import { FunctionComponent, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { atomUserFilter } from '../components/section-users'
import { AppUserConstant } from '../modules/app-users'
import { withAugmented } from './with-augmented'

// DEBT: Convert status input to dropdown
const FormUserFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(AppUserConstant.i18nNamespace)
  const [filters, setFilters] = useAtom(atomUserFilter)
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
