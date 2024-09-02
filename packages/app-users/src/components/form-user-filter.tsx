import type { FunctionComponent } from 'react'

import { Button, FormLabel, Input } from '@chakra-ui/react'
import { LayoutFlex, UIBox, UITypography } from '@gnowth/lib-react'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { stateUserFilter } from '../components/section-users'
import { dependencies } from '../dependencies'
import { LayoutSection } from './layout-section'
import { withAugmented } from './with-augmented'

// DEBT: Convert status input to dropdown
const FormUserFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)
  const [filters, setFilters] = useRecoilState(stateUserFilter)

  return (
    <Formik
      enableReinitialize
      initialValues={filters}
      onSubmit={(values) => setFilters({ ...values, page: 1 })}
    >
      <LayoutSection>
        <LayoutFlex alignItems="flex-end" as={Form} gap="sm">
          <UIBox>
            <FormLabel htmlFor="form-user-filter-email">
              <UITypography value={t('Email')} variant="label" />
            </FormLabel>
            <Field as={Input} id="form-user-filter-email" name="email" placeholder={t('email')} />
          </UIBox>

          <UIBox>
            <FormLabel htmlFor="form-user-filter-status">
              <UITypography value={t('Status')} variant="label" />
            </FormLabel>
            <Field as={Input} id="form-user-filter-status" name="status" placeholder={t('status')} />
          </UIBox>

          <Button type="submit">{t('Submit')}</Button>
        </LayoutFlex>
      </LayoutSection>
    </Formik>
  )
}

export const FormUserFilter = withAugmented()(FormUserFilterComponent)
