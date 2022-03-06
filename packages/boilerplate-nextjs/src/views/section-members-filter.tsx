import { Box, Button, FormLabel, HStack, Input } from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import { useRecoilState } from 'recoil'

import LayoutSection from '../components/layout-section'
import { stateMembersFilter } from './section-members'

// DEBT: Convert status input to dropdown
function SectionMembersFilter() {
  const [filters, setFilters] = useRecoilState(stateMembersFilter)

  return (
    <LayoutSection>
      <Formik initialValues={filters} onSubmit={(values) => setFilters(values)}>
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

export default SectionMembersFilter
