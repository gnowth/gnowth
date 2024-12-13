import { ComponentProps, FunctionComponent, PropsWithChildren } from 'react'

import { PlatformProviderI18n } from './PlatformProvider.i18n'
import { PlatformProviderQuery } from './PlatformProvider.query'

// DEBT(feature): add analytics provider
// DEBT(feature): add auth provider
// DEBT(feature): add i18n provider
// DEBT(feature): add layout provider
// DEBT(feature): add performance provider
// DEBT(feature): add query provider
// DEBT(feature): add router provider
// DEBT(feature): add theme provider
type Props = PropsWithChildren<
  ComponentProps<typeof PlatformProviderI18n> & ComponentProps<typeof PlatformProviderQuery>
>
export const PlatformProvider: FunctionComponent<Props> = (props) => {
  return (
    <PlatformProviderI18n
      i18nClientDefinition={props.i18nClientDefinition}
      I18nClientProvider={props.I18nClientProvider}
    >
      <PlatformProviderQuery
        queryClientDefinition={props.queryClientDefinition}
        QueryClientProvider={props.QueryClientProvider}
      >
        {props.children}
      </PlatformProviderQuery>
    </PlatformProviderI18n>
  )
}
