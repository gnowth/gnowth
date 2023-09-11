import type { FunctionComponent } from 'react'
import { LayoutSection } from '@gnowth/core-app'
import { Spinner } from '@chakra-ui/react'

export const AppLoading: FunctionComponent = () => {
  return (
    <LayoutSection containerProps={{ textAlign: 'center' }}>
      <Spinner thickness="10px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
    </LayoutSection>
  )
}
