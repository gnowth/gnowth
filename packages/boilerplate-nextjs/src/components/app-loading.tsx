import type { FunctionComponent } from 'react'
import { LayoutSection } from '@gnowth/app-core'
import { Spinner } from '@chakra-ui/react'

export const AppLoading: FunctionComponent = () => {
  return (
    <LayoutSection containerProps={{ textAlign: 'center' }}>
      <Spinner color="teal.500" emptyColor="gray.200" size="xl" speed="0.65s" thickness="10px" />
    </LayoutSection>
  )
}
