import type { NextPage } from 'next'
import type { ComponentType, FunctionComponent, PropsWithChildren } from 'react'
import { Box, VStack } from '@chakra-ui/react'

import { compose } from '../utils/compose'
import SectionFooter from './section-footer'
import SectionHeader from './section-header'
import withErrorBoundary from '../utils/with-error-boundary'
import withSuspense from '../utils/with-suspense'

interface Props {
  component: NextPage & {
    Layout?: ComponentType<PropsWithChildren>
  }
}

const FrameDefault: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { Layout } = props.component

  if (Layout) {
    return <Layout>{props.children}</Layout>
  }

  return (
    <VStack alignItems="stretch" minHeight="100vh" spacing="10">
      <SectionHeader />

      {props.children}

      <Box flex="1" sx={{ marginTop: '0 !important' }} />

      <SectionFooter />
    </VStack>
  )
}

export default compose(withSuspense(), withErrorBoundary)(FrameDefault)
