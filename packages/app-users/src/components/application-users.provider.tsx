import { PlatformProvider } from '@gnowth/lib-react'
import { QueryClientProvider } from '@tanstack/react-query'
import { FunctionComponent, PropsWithChildren } from 'react'

export const ApplicationUsersProvider: FunctionComponent<PropsWithChildren> = (props) => (
  <PlatformProvider QueryClientProvider={QueryClientProvider}>{props.children}</PlatformProvider>
)
