import type { FunctionComponent } from 'react'

import { FormLabel, Input } from '@chakra-ui/react'
import { LayoutFlex, LayoutSection, UIBox, UIButton, UITypography } from '@gnowth/lib-react'
import { Field, Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { stateUserFilter } from '../components/section-users'
import { dependencies } from '../dependencies'
import { withAugmented } from './with-augmented'

// DEBT: Convert status input to dropdown
const FormUserFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(dependencies.appModel.namespace)
  const [filters, setFilters] = useRecoilState(stateUserFilter)

  return (
    <LayoutSection variant="container">
      <Formik
        enableReinitialize
        initialValues={filters}
        onSubmit={(values) => setFilters({ ...values, page: 1 })}
      >
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

          <UIButton textValue={t('Submit')} type="submit" />
        </LayoutFlex>
      </Formik>
    </LayoutSection>
  )
}

export const FormUserFilter = withAugmented()(FormUserFilterComponent)
