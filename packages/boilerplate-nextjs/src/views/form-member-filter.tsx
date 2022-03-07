import { Box, Button, FormLabel, HStack, Input } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { useRecoilState } from 'recoil'

import LayoutSection from '../components/layout-section'
import { stateMemberFilter } from './section-members'

// DEBT: Convert status input to dropdown
function FormMemberFilter() {
  const [filters, setFilters] = useRecoilState(stateMemberFilter)

  return (
    <LayoutSection>
      <Formik
        enableReinitialize
        initialValues={filters}
        onSubmit={(values) => setFilters({ ...values, page: 1 })}
      >
        <HStack as={Form} alignItems="flex-end" spacing="5">
          <Box>
            <FormLabel htmlFor="form-member-filter-email">Email</FormLabel>
            <Field as={Input} id="form-member-filter-email" name="email" placeholder="email" />
          </Box>

          <Box>
            <FormLabel htmlFor="form-member-filter-status">Status</FormLabel>
            <Field as={Input} id="form-member-filter-status" name="status" placeholder="status" />
          </Box>

          <Button type="submit">Submit</Button>
        </HStack>
      </Formik>
    </LayoutSection>
  )
}

export default FormMemberFilter
