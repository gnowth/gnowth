import type { FunctionComponent } from 'react'
import { LayoutSection } from '@app/core'
import { Spinner } from '@chakra-ui/react'

const AppLoading: FunctionComponent = () => {
  return (
    <LayoutSection containerProps={{ textAlign: 'center' }}>
      <Spinner thickness="10px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
    </LayoutSection>
  )
}

export default AppLoading
