import type { FunctionComponent } from 'react'

import { Spinner } from '@chakra-ui/react'
import { LayoutSection } from '@gnowth/lib-react'

export const AppLoading: FunctionComponent = () => {
  return (
    <LayoutSection layout="flex" layoutVariant="horizontalCenter" variant="container">
      <Spinner color="teal.500" emptyColor="gray.200" size="xl" speed="0.65s" thickness="10px" />
    </LayoutSection>
  )
}
