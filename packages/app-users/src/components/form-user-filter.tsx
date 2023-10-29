import type { FunctionComponent } from 'react'
import { Box, Button, FormLabel, HStack, Input } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { useRecoilState } from 'recoil'

import { stateUserFilter } from '../components/section-users'
import { ModelApp } from '../models/model-app'
import { LayoutSectionDeprecated } from './layout-section-deprecated'
import { withAugmentedDeprecated } from './with-augmented-deprecated'

// DEBT: Convert status input to dropdown
const FormUserFilterComponent: FunctionComponent = () => {
  const { t } = useTranslation(ModelApp.namespace)
  const [filters, setFilters] = useRecoilState(stateUserFilter)

  return (
    <Formik
      enableReinitialize
      initialValues={filters}
      onSubmit={(values) => setFilters({ ...values, page: 1 })}
    >
      <LayoutSectionDeprecated>
        <HStack alignItems="flex-end" as={Form} spacing="5">
          <Box>
            <FormLabel htmlFor="form-user-filter-email">{t('Email')}</FormLabel>
            <Field as={Input} id="form-user-filter-email" name="email" placeholder={t('email')} />
          </Box>

          <Box>
            <FormLabel htmlFor="form-user-filter-status">{t('Status')}</FormLabel>
            <Field as={Input} id="form-user-filter-status" name="status" placeholder={t('status')} />
          </Box>

          <Button type="submit">{t('Submit')}</Button>
        </HStack>
      </LayoutSectionDeprecated>
    </Formik>
  )
}

export const FormUserFilter = withAugmentedDeprecated()(FormUserFilterComponent)
