import type { NextPage } from 'next'
import type { ComponentType, FunctionComponent, PropsWithChildren } from 'react'
import { VStack } from '@chakra-ui/react'

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
      {props.children}
    </VStack>
  )
}

export default FrameDefault
